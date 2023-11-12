try:
    import sys
    from flask import render_template, g
    from flask_babel import _

    from . import errors_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)

# ----------------------------Error Handlers------------------------------------#


@errors_bp.app_errorhandler(404)
def error404(e):
    if g.lang_code == "en":
        lang_icon = "icons/us_flag.html"
    elif g.lang_code == "es":
        lang_icon = "icons/mx_flag.html"
    return render_template(
        "error.html",
        pageTitle=_("Not Found"),
        error_code="404",
        lang_icon=lang_icon,
        error_msg=_("The page you were looking for could not be found."),
    )


@errors_bp.app_errorhandler(405)
def error404(e):
    if g.lang_code == "en":
        lang_icon = "icons/us_flag.html"
    elif g.lang_code == "es":
        lang_icon = "icons/mx_flag.html"
    return render_template(
        "error.html",
        pageTitle=_("Not Allowed"),
        error_code="405",
        lang_icon=lang_icon,
        error_msg=_("You shouldn't try to do that."),
    )


# @Description: Endpoint to verify error 500 if its the case.
@errors_bp.app_errorhandler(500)
def error500(e):
    return render_template("error.html")
