try:
    import os
    import sys
    import random
    from flask import render_template

    from . import index_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@index_bp.route("/")
def index():
    icon_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../templates/icons/carousel/'))
    icon_files = [f for f in os.listdir(icon_folder) if f.endswith('.html')]
    random.shuffle(icon_files)
    return render_template("index.html", pageTitle="Guillermo Ortega", icon_files=icon_files)
