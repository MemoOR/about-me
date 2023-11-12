try:
    import sys
    from flask import render_template, current_app, request, abort, redirect, url_for
    from flask_babel import _

    from . import errors_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@errors_bp.url_defaults
def add_language_code(endpoint, values):
    if "lang_code" in current_app.config:
        values.setdefault("lang_code", current_app.config["lang_code"])
    else:
        values.setdefault("lang_code", "en")


@errors_bp.url_value_preprocessor
def pull_lang_code(endpoint, values):
    current_app.config["lang_code"] = values.pop("lang_code")


@errors_bp.before_request
def before_request():
    if current_app.config["lang_code"] not in current_app.config["LANGUAGES"]:
        current_app.config["lang_code"] = "en"
        abort(404)

    dfl = request.url_rule.defaults
    if "lang_code" in dfl:
        if dfl["lang_code"] != request.full_path.split("/")[1]:
            abort(404)


# ----------------------------Error Handlers------------------------------------#


@errors_bp.route("/404")
def error_404():
    return render_template(
        "error.html",
        pageTitle=_("Not Found"),
        error_code="404",
        error_msg=_("The page you were looking for could not be found."),
    )


@errors_bp.app_errorhandler(404)
def error404(e):
    return redirect(url_for("error.error_404"))


@errors_bp.route("/405")
def error_405():
    return render_template(
        "error.html",
        pageTitle=_("Not Allowed"),
        error_code="405",
        error_msg=_("You shouldn't try to do that."),
    )


@errors_bp.app_errorhandler(405)
def error405(e):
    return redirect(url_for("error.error_405"))

