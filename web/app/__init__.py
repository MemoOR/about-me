try:
    import sys
    import logging
    import datetime as dt
    from logging.handlers import SMTPHandler

    from flask import Flask, request, current_app
    from flask_mail import Mail
    from flask_babel import Babel

    from app.blueprints.common.filters import format_datetime
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)

mail = Mail()
babel = Babel()


def create_app(settings_module):
    app = Flask(__name__, instance_relative_config=True)

    # Load the config file specified by the APP environment variable
    app.config.from_object(settings_module)

    # Load the configuration from the instance folder
    app.config.from_pyfile("config.py", silent=True)

    configure_logging(app)

    mail.init_app(app)
    babel.init_app(app, locale_selector=get_locale)

    # Filters
    register_filters(app)

    # context_processor
    register_context_processor(app)

    # Blueprints
    # # Main Page
    from app.blueprints.index import index_bp

    app.register_blueprint(index_bp)

    # # 3d Page
    from app.blueprints.appThreejs import appthreejs_bp

    app.register_blueprint(appthreejs_bp)

    # # Email
    from app.blueprints.email import email_bp

    app.register_blueprint(email_bp)

    # # Error handlers
    from app.blueprints.errorHandlers import errors_bp

    app.register_blueprint(errors_bp)

    return app


def register_context_processor(app):
    @app.context_processor
    def dateNow():
        return {"now": dt.datetime.utcnow()}


def get_locale():
    if not current_app.config.get("lang_code", None):
        current_app.config['lang_code'] = request.accept_languages.best_match(current_app.config["LANGUAGES"])
    return current_app.config['lang_code']


def register_filters(app):
    app.jinja_env.filters["datetime"] = format_datetime


def configure_logging(app):
    """
    Configure Logs.

    :param app: Flask app

    """

    # Elimina los manejadores por defecto de la app
    del app.logger.handlers[:]

    loggers = [
        app.logger,
    ]
    handlers = []

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(verbose_formatter())

    if (
        (app.config["APP_ENV"] == app.config["APP_ENV_LOCAL"])
        or (app.config["APP_ENV"] == app.config["APP_ENV_TESTING"])
        or (app.config["APP_ENV"] == app.config["APP_ENV_DEVELOPMENT"])
    ):
        console_handler.setLevel(logging.DEBUG)
        handlers.append(console_handler)
    elif app.config["APP_ENV"] == app.config["APP_ENV_PRODUCTION"]:
        console_handler.setLevel(logging.INFO)
        handlers.append(console_handler)

        mail_handler = SMTPHandler(
            (app.config["MAIL_SERVER"], app.config["MAIL_PORT"]),
            app.config["DONT_REPLY_FROM_EMAIL"],
            app.config["ADMINS"],
            "[Error][{}] La aplicación falló".format(app.config["APP_ENV"]),
            (app.config["MAIL_USERNAME"], app.config["MAIL_PASSWORD"]),
            (),
        )
        mail_handler.setLevel(logging.ERROR)
        mail_handler.setFormatter(mail_handler_formatter())
        handlers.append(mail_handler)

    for l in loggers:
        for handler in handlers:
            l.addHandler(handler)
        l.propagate = False
        l.setLevel(logging.DEBUG)


def mail_handler_formatter():
    return logging.Formatter(
        """
            Message type:       %(levelname)s
            Location:           %(pathname)s:%(lineno)d
            Module:             %(module)s
            Function:           %(funcName)s
            Time:               %(asctime)s.%(msecs)d

            Message:

            %(message)s
        """,
        datefmt="%d/%m/%Y %H:%M:%S",
    )


def verbose_formatter():
    return logging.Formatter(
        "[%(asctime)s.%(msecs)d]\t %(levelname)s \t[%(name)s.%(funcName)s:%(lineno)d]\t %(message)s",
        datefmt="%d/%m/%Y %H:%M:%S",
    )
