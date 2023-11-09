try:
    import sys
    import requests
    from flask import current_app, request, jsonify, abort

    from app.blueprints.common.mail import send_mail, validate_mail_fields
    from . import email_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@email_bp.route("/send_email", methods=["POST"])
def send_email():
    user_name = request.form["userName"]
    user_email = request.form["userEmail"]
    user_message = request.form["userMessage"]
    secret_response = request.form["g-recaptcha-response"]

    verify_response = requests.post(
        url=f'{current_app.config["RECAPTCHA_VERIFY_URL"]}?secret={current_app.config["RECAPTCHA_PRIVATE_KEY"]}&response={secret_response}'
    ).json()

    if verify_response["success"] == False or verify_response["score"] < 0.5:
        response = {"text": "You didn't passed the captcha", "type": "error"}
        return jsonify(response)

    proceed, message = validate_mail_fields(user_name, user_email, user_message)

    if not proceed:
        response = {"text": message, "type": "error"}
        return jsonify(response)

    try:
        send_mail(
            subject=f"Mensaje de mi pagina web: {user_email}",
            sender=current_app.config["MAIL_DEFAULT_SENDER"],
            recipients=["memo.or99@hotmail.com"],
            text_body=f"Mensaje de: {user_email}",
            html_body=f"<h2>From: {user_name}</h2><h5>Email: {user_email}</h5><p>Message:<br>{user_message}</p>",
        )

        response = {
            "text": "I got your message and will contact you soon!",
            "type": "success",
        }
    except Exception as e:
        response = {"text": "Something went wrong", "type": "error"}
        print(e)

    return jsonify(response)
