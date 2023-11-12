import os

pdf_urls = {
    "ielts_certificate_url": os.getenv("IELTS_CERTIFICATE_URL"),
    "spanish_cv_url_preview": os.getenv("CV_URL_PREVIEW"),
    "spanish_cv_url_download": os.getenv("CV_URL_DOWNLOAD"),
    "english_cv_url_preview": os.getenv("CV_URL_PREVIEW"),
    "english_cv_url_download": os.getenv("CV_URL_DOWNLOAD")
}

certificate_urls = {
    "udemy_devops": os.getenv("UDEMY_DEVOPS"),
    "udemy_threejs": os.getenv("UDEMY_THREEJS")
}