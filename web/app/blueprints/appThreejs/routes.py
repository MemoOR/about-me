try:
    import sys
    from flask import Blueprint, render_template

    from . import appthreejs_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@appthreejs_bp.route("/3dworld")
def appthreejs():
    return render_template("view.html", pageTitle="Guillermo Ortega")
