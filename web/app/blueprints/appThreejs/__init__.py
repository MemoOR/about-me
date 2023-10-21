from flask import Blueprint

appthreejs_bp = Blueprint("3dworld", __name__, template_folder="templates")

from . import routes
