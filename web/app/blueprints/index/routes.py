try:
    import os
    import sys
    import random
    from flask import abort, current_app, request, redirect, render_template, g, url_for
    from flask_babel import _
    from instance import pdf_urls, certificate_urls

    from . import index_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@index_bp.before_request
def before_request():
    if g.lang_code not in current_app.config['LANGUAGES']:
        adapter = current_app.url_map.bind('')
        try:
            endpoint, args = adapter.match('/en' + request.full_path.rstrip('/ ?'))
            return redirect(url_for(endpoint, **args), 301)
        except:
            abort(404)

    dfl = request.url_rule.defaults
    if 'lang_code' in dfl:
        if dfl['lang_code'] != request.full_path.split('/')[1]:
            abort(404)


@index_bp.url_defaults
def add_language_code(endpoint, values):
    values.setdefault("lang_code", g.lang_code)


@index_bp.url_value_preprocessor
def pull_lang_code(endpoint, values):
    g.lang_code = values.pop("lang_code")

@index_bp.route("/")
@index_bp.route("/index")
def index():
    icon_folder = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../templates/icons/carousel/")
    )
    icon_files = [f for f in os.listdir(icon_folder) if f.endswith(".html")]
    random.shuffle(icon_files)

    if g.lang_code == "en":
        lang_icon = "icons/us_flag.html"
        pdf_urls_filtered = {
            "ielts_certificate_url": pdf_urls["ielts_certificate_url"],
            "cv_url_preview": pdf_urls["english_cv_url_preview"],
            "cv_url_download": pdf_urls["english_cv_url_download"],
        }
    elif g.lang_code == "es":
        lang_icon = "icons/mx_flag.html"
        pdf_urls_filtered = {
            "ielts_certificate_url": pdf_urls["ielts_certificate_url"],
            "cv_url_preview": pdf_urls["spanish_cv_url_preview"],
            "cv_url_download": pdf_urls["spanish_cv_url_download"],
        }

    return render_template(
        "index.html",
        pageTitle="Guillermo Ortega Romo",
        icon_files=icon_files,
        lang_icon=lang_icon,
        pdf_urls=pdf_urls_filtered,
        certificate_urls=certificate_urls,
        captcha_key=current_app.config["RECAPTCHA_SITE_KEY"],
    )
