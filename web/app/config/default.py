from os.path import abspath, dirname, join

LANGUAGES = ['en', 'es']
BABEL_DEFAULT_LOCALE = "en"

# Define the application directory
BASE_DIR = dirname(dirname(abspath(__file__)))

# Media dir
MEDIA_DIR = join(BASE_DIR, "media")
POSTS_IMAGES_DIR = join(MEDIA_DIR, "posts")

# App environments
APP_ENV_LOCAL = "local"
APP_ENV_TESTING = "testing"
APP_ENV_DEVELOPMENT = "development"
APP_ENV_STAGING = "staging"
APP_ENV_PRODUCTION = "production"
APP_ENV = ""

# # Config email
MAIL_DEBUG = False
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 465
MAIL_USE_TLS = False
MAIL_USE_SSL = True

# # Config captcha
RECAPTCHA_USE_SSL = True