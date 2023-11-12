import os 
import ssl

# ssl context
abs_path = os.path.abspath(os.path.dirname(__file__))
ssl_paths = {
    "certificate": f"{abs_path}/../../instance/certificate.pem",
    "key": f"{abs_path}/../../instance/privateKey.pem",
}
ssl_context = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
ssl_context.load_cert_chain(ssl_paths["certificate"], ssl_paths["key"])