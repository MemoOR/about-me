from flask import Blueprint

index_bp = Blueprint("index", __name__, template_folder="templates", url_prefix='/<lang_code>')

from . import routes
