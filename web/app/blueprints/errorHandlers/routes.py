try:
    import sys
    from flask import render_template

    from . import errors_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)

# ----------------------------Error Handlers------------------------------------#


@errors_bp.app_errorhandler(404)
def error404(e):
    return render_template(
        "error.html",
        pageTitle="Not Found",
        error_code="404",
        error_msg="The page you were looking for could not be found.",
    )


@errors_bp.app_errorhandler(405)
def error404(e):
    return render_template(
        "error.html",
        pageTitle="Not Allowed",
        error_code="405",
        error_msg="You shouldn't try to do that.",
    )


# @Description: Endpoint to verify error 500 if its the case.
@errors_bp.app_errorhandler(500)
def error500(e):
    return render_template("error.html")
