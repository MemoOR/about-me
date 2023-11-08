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
    return render_template("error404.html", pageTitle="Not Found")


# @Description: Endpoint to verify error 500 if its the case.
@errors_bp.app_errorhandler(500)
def error500(e):
    return render_template("error500.html")
