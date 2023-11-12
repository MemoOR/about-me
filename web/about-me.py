# @Author: Guillermo Ortega Romo.
# @Description: Start the app server
try:
    import os
    import sys
    from flask import redirect, request, url_for, current_app
    from app import create_app
    from app.config import ssl_context
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)

settings_module = os.getenv("APP_SETTINGS_MODULE", "app.config.local")
app = create_app(settings_module)

@app.route('/')
def home():
    with app.app_context():
        current_app.config['lang_code'] = request.accept_languages.best_match(app.config['LANGUAGES'])
        return redirect(url_for('index.index'))

#-------------------------------Execute----------------------------------------#
if __name__ == "__main__":
    try:
        app.run(
            host="0.0.0.0",
            port=os.getenv("APP_PORT", 7168),
            ssl_context=ssl_context,
            debug=True,
        )
    except KeyboardInterrupt:
        print("Ctrl + C")
        print("Shutdown app...")
    except Exception as err:
        print(f"Error: {err}")
