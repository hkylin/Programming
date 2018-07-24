const fs = require("fs");
const path = require("path");

// To get dicetory use __dirname
const file = path.join(__dirname, "customers.csv");
const file1 = path.join(__dirname, "message.txt");

fs.readFile(file, { encoding: "utf-8" }, function(error, data) {
  if (error) return console.error(error);
  console.log("****Before Append****");
  console.log(data);
});

fs.writeFile(file1, "Hello World!", function(error) {
  if (error) return console.error(error);
  console.log("Writing is done.");
});

fs.appendFile(file, ",\nRajendra", function(error) {
  if (error) return console.error(error);
  console.log("Append is done.");
});

fs.readFile(file, { encoding: "utf-8" }, function(error, data) {
  if (error) return console.error(error);
  console.log("****After Append****");
  console.log(data);
});
