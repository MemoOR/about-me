try:
    import sys
    from flask import render_template, current_app, abort, redirect, url_for, request
    from flask_babel import _

    from . import appthreejs_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@appthreejs_bp.before_request
def before_request():
    if current_app.config['lang_code'] not in current_app.config["LANGUAGES"]:
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
    values.setdefault("lang_code", current_app.config['lang_code'])


@appthreejs_bp.url_value_preprocessor
def pull_lang_code(endpoint, values):
    current_app.config['lang_code'] = values.pop("lang_code")


SITE_URL = "https://guillermoortega.me"

@appthreejs_bp.route("/3dworld", defaults={"lang_code": "en"})
@appthreejs_bp.route("/mundo3d", defaults={"lang_code": "es"})
def appthreejs():
    lang_code = current_app.config['lang_code']
    return render_template(
        "view.html",
        pageTitle="Guillermo Ortega Romo",
        lang_code=lang_code,
        canonical_url=f"{SITE_URL}/{lang_code}/{'3dworld' if lang_code == 'en' else 'mundo3d'}",
        alt_en_url=f"{SITE_URL}/en/3dworld",
        alt_es_url=f"{SITE_URL}/es/mundo3d",
        og_image_url=f"{SITE_URL}/static/assets/web_manifest/android-chrome-512x512.png",
    )
