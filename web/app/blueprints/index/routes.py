try:
    import os
    import sys
    import random
    from flask import render_template
    from app.instance import pdf_urls, certificate_urls

    from . import index_bp
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)


@index_bp.route("/")
def index():
    icon_folder = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../templates/icons/carousel/")
    )
    icon_files = [f for f in os.listdir(icon_folder) if f.endswith(".html")]
    random.shuffle(icon_files)

    # later this will help with languages
    pdf_urls_filtered = {
        "ielts_certificate_url": pdf_urls["ielts_certificate_url"],
        "cv_url_preview": pdf_urls["english_cv_url_preview"],
        "cv_url_download": pdf_urls["english_cv_url_download"]
    }

    return render_template(
        "index.html",
        pageTitle="Guillermo Ortega",
        icon_files=icon_files,
        pdf_urls=pdf_urls_filtered,
        certificate_urls=certificate_urls
    )
