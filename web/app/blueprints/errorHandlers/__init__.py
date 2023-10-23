from flask import Blueprint

errors_bp = Blueprint("error", __name__, template_folder="templates")

from . import routes
