try:
    import re
    import sys
    import html
    import logging

    from smtplib import SMTPException
    from threading import Thread

    from flask import current_app
    from flask_mail import Message
    from flask_babel import _

    from app import mail
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


logger = logging.getLogger(__name__)


def _send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except SMTPException:
            logger.exception("Error sending email")


def validate_mail_fields(user_name, user_email, user_message):
    """
    sanity check before sending an email
    """
    user_name = html.escape(user_name)
    user_message = html.escape(user_message)

    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    if not re.match(email_regex, user_email):
        return False, _("The email you entered is not valid")

    return True, "Validation success"


def send_mail(
    subject, sender, recipients, text_body, cc=None, bcc=None, html_body=None
):
    msg = Message(subject, sender=sender, recipients=recipients, cc=cc, bcc=bcc)
    msg.body = text_body
    if html_body:
        msg.html = html_body
    Thread(
        target=_send_async_email, args=(current_app._get_current_object(), msg)
    ).start()
