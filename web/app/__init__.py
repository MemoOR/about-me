try:
    import sys
    from flask import Flask
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)

# Creation of the flask app.
__version__ = "0.0.1"
SECRET_KEY = "secret-key-goes-here"
STATIC_URL_PATH="/static"


def create_app():
    app = Flask(__name__, static_url_path=STATIC_URL_PATH)
    app.config["SECRET_KEY"] = SECRET_KEY
    return app

app = create_app()

from app import routes