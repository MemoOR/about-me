try:
    import sys
    from app import app
    from flask import render_template
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)

#----------------------------Error Handlers------------------------------------#

@app.route("/error404")
def error404():
    return render_template('errorHandlers/error404.html')

# @Description: Endpoint to verify error 500 if its the case.
@app.route("/error500")
def error500():
    return render_template('errorHandlers/error500.html')
