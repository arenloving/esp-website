import http.server, socketserver, os

os.chdir('/Users/maggieloving/.openclaw/workspace/aren/esp-website')

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ReuseTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

with ReuseTCPServer(("0.0.0.0", 8888), NoCacheHandler) as httpd:
    httpd.serve_forever()
