from flask import Blueprint

errors_bp = Blueprint("error", __name__, template_folder="templates", url_prefix='/<lang_code>')

from . import routes
