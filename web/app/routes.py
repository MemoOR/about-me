try:
    import sys
    import datetime as dt
    from app import app
    from flask import render_template
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)

# -------------Context processor-------------
@app.context_processor
def dateNow():
    return {
        "now": dt.datetime.utcnow()
    }

# -------------Endpoints-------------
@app.route("/")# Welcome HTML template
def index():
    return render_template("index.html", pageTitle= "Guillermo Ortega")