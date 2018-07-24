const http = require("http");
const path = require("path");

// const fs = require("fs");
// const file = path.join(__dirname, "message.txt");

// let message = fs.readFileSync(file, { encoding: "utf-8" }, function(
//   error,
//   data
// ) {
//   if (error) return console.error(error);
//   message = data;
// });

let message =
  '<h1>Hello World!</h1><span style="font-family:Arial;font-size=14px;">This is Arial</span><span style="color:#FF0000;background-color:#FFFF00;">red over yellow</span>';

const body = {
  to: "ms458j",
  from: "ms458j@intl.att.com",
  password: "Rocktheparty123",
  displayfromname: "ms458j",
  html: message
};
const postData = JSON.stringify(body);

const options = {
  hostname: "bots.q.att.com",
  port: 9015,
  path: "/QBotService/BotTalk?json=true",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(postData)
  }
};

const req = http.request(options, res => {
  res.on("data", chunk => {
    console.log(`BODY: ${chunk}`);
  });
  res.on("end", () => {
    console.log("No more data in response.");
  });
});

req.on("error", e => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();
