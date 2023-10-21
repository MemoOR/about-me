# @File: main.py
# @Author: Guillermo Ortega Romo.
# @Description: This file starts all the complete server builded with flask, this code has only the way the app should be executed.
#              Which means if the server should be executed in development mode or production.
try:
    import os
    import sys
    from app import create_app
    from gevent.pywsgi import WSGIServer
except ImportError as error:
    sys.exit("Error in:" + __file__ + " " + error.__class__.__name__ + ": " + error.msg)
except Exception as exception:
    sys.exit("Error in:" + __file__ + exception)

# -------------------------------Execute----------------------------------------#
if __name__ == "__main__":
    try:
        settings_module = os.getenv("APP_SETTINGS_MODULE", "app.config.local")
        app = create_app(settings_module)
        # -----------------Dev mode-----------------
        app.run(host="127.0.0.1", port=7168, debug=True, use_reloader=True)

        # -----------------Prod mode----------------
        # appServer=  WSGIServer(("127.0.0.1", 7168), app)
        # appServer.serve_forever()
    except KeyboardInterrupt:
        print("Ctrl + C")
        print("Shutdown app...")
    except Exception as err:
        print(f"Error: {err}")
    else:
        print("\nRestarting app")
