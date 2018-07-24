# Simple script for launching a listening chatbot server
# (see http://q.att.com/wiki/ChatBot_Service)
# 9/27/16 - ez2685 - release unto the world
# 3/26/18 - cb314j - updated to add method for push notifications & sender
# validation

try:   # python 2
    import SimpleHTTPServer
    import SocketServer
    from urllib import unquote
except:  # python 3
    from http.server import SimpleHTTPServer
    import socketserver as SocketServer
    from urllib.parse import unquote

import json
import base64

BOTID = 'PUT_BOT_ID_HERE@chatbots.q.att.com'
BOTKEY = 'get_from_chatbotbot'

# When someone sends a message to the bot, Q's bot service receives that
# message , then pushes a POST to the BOT's specified URL.
# This is a simple HTTP server to accept that request and reply back.


class SimpleServer(SimpleHTTPServer.SimpleHTTPRequestHandler):
    isVerbose = False

    # Unify responses to POST and GET requests
    def do_POST(self):
        return self.do_GET()

    def push_notify(self, target, response):
        import requests
        from requests.auth import HTTPBasicAuth
        requests_options = {
            'auth': HTTPBasicAuth(BOTID, BOTKEY)
            }
        url = 'http://chatbots.q.att.com:19221/push/' + target
        # NOTE: Target will either be an attuid, or `meeting:[meeting_id]`
        requests.post(url, data=response, **requests_options)

    def do_GET(self):
        # This is an optional (but highly recommended) step, validate the
        # identity of the sender using the Basic HTTP Authentication header.
        # It should be BOTID:BOTKEY
        try:
            b64_authstring = self.headers['Authorization'].split(' ')[1]
            # If we do not see a match this is request did not include the
            # correct HTTP Authentication header
            if base64.b64decode(b64_authstring) != BOTID + ':' + BOTKEY:
                print('Sender Validation Failed')
                self.protocol_version = 'HTTP/1.1'
                self.send_response(403, 'FORBIDDEN')
                return
        except KeyError:
            print('Sender Validation Failed')
            self.protocol_version = 'HTTP/1.1'
            self.send_response(403, 'FORBIDDEN')
            return

        if self.isVerbose:
            print("Headers: {:}".format(self.headers))

        # allow direct requests from your browser 'http://<ip>:<port>?<JSON>
        #   where JSON is "{"from":"<simulation>", "message":"<message>"}
        readStr = unquote(self.path.split('?')[-1])
        readObj = None
        if self.headers.has_key('content-length'):
            length = int(self.headers['content-length'])
            readStr = self.rfile.read(length)
        if len(readStr):        # if some content, try to brute-force decode
            try:
                readObj = json.loads(readStr)
            except Exception, e:
                readObj = None  # or error out here
                if self.isVerbose:
                    print("Error parsing JSON request: '{:}'".format(e))
        if self.isVerbose:
            print("Request: {:}".format(readStr))
        resultStr = ""
        # a more complex example: http://stackoverflow.com/questions/6530979/html-in-do-get-method-of-a-simple-python-webserver
        if readObj is None:
            resultStr = "Sorry, I couldn't parse your request. Please try again."
        else:
            try:
                resultStr = "User ({:}) said '{:}' from '{:}' on path {:}".format(readObj['from'], readObj['message'],  self.address_string(), self.path)
            except:
                resultStr = "Sorry, your request was parsed, but the format was invalid. Please try again."
        self.protocol_version = 'HTTP/1.1'
        self.send_response(200, 'OK')
        self.send_header('Content-type', 'text/plain')
        self.send_header('Content-length', len(resultStr))
        self.end_headers()
        self.wfile.write(resultStr)
        # Example of push-notification echo
        # self.push_notify(readObj['from'],'PUSH NOTIFY ECHO: {}'.format(readObj))

    @staticmethod
    def serve_forever(port, address="", verbose=True):
        vis_address = "(all interfaces)" if len(address)== 0 else address
        print("SimpleServer at http://{:}:{:}".format(vis_address, port))
        SimpleServer.isVerbose = verbose
        # want threads? https://docs.python.org/3/library/socketserver.html#asynchronous-mixins
        SocketServer.TCPServer((address, port), SimpleServer).serve_forever()


if __name__ == "__main__":
    SimpleServer.serve_forever(8899, verbose=False)
