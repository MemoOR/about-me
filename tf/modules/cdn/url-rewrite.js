function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Never rewrite the serverless API path.
    if (uri.startsWith('/api/')) {
        return request;
    }

    if (uri.endsWith('/')) {
        // "/" -> "/index.html"
        request.uri += 'index.html';
    } else if (uri.lastIndexOf('.') <= uri.lastIndexOf('/')) {
        // Extensionless route (e.g. "/en", "/en/3dworld") -> serve the
        // prerendered ".html" file.
        request.uri += '.html';
    }

    return request;
}
