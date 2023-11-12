try:
    import sys
    from flask import render_template, g, current_app, abort, redirect, url_for, request
    from flask_babel import _

    from . import appthreejs_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@appthreejs_bp.before_request
def before_request():
    if g.lang_code not in current_app.config["LANGUAGES"]:
        adapter = current_app.url_map.bind("")
        try:
            endpoint, args = adapter.match("/en" + request.full_path.rstrip("/ ?"))
            return redirect(url_for(endpoint, **args), 301)
        except:
            abort(404)

    dfl = request.url_rule.defaults
    if "lang_code" in dfl:
        if dfl["lang_code"] != request.full_path.split("/")[1]:
            abort(404)


@appthreejs_bp.url_defaults
def add_language_code(endpoint, values):
    values.setdefault("lang_code", g.lang_code)


@appthreejs_bp.url_value_preprocessor
def pull_lang_code(endpoint, values):
    g.lang_code = values.pop("lang_code")


@appthreejs_bp.route("/3dworld", defaults={"lang_code": "en"})
@appthreejs_bp.route("/mundo3d", defaults={"lang_code": "es"})
def appthreejs():
    return render_template("view.html", pageTitle="Guillermo Ortega Romo")
