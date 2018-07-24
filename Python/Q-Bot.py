import json
import urllib.request

contactID = "ms458j"
to="sk093b"
Bot_from="ms458j"
botID = "ms458j@intl.att.com"
password = "Rocktheparty123"
botUrl = "http://bots.q.att.com:9015/QBotService/BotTalk?json=true"

# message = "Hi Suraj!"

message_file = open("message.txt","r+")
message = message_file.read()
print(message)
message_file.close()

body =     {
    "to":to,
    "from":botID,
    "password":password,
    "displayfromname":Bot_from,
    "html":message}

req = urllib.request.Request(botUrl)
req.add_header('Content-Type', 'application/json; charset=utf-8')
jsondata = json.dumps(body)
jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
req.add_header('Content-Length', len(jsondataasbytes))
response = urllib.request.urlopen(req, jsondataasbytes)