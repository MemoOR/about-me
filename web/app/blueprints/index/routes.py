try:
    import sys
    from flask import render_template

    from . import index_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@index_bp.route("/")
def index():
    return render_template("index.html", pageTitle="Guillermo Ortega")
