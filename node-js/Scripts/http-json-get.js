const https = require("https");
const url =
  "https://tspace.web.att.com/files/app/file/964e5596-eb92-43f9-8997-a7451f8dc17a";
https
  .get(url, response => {
    let rawData = "";
    response.on("data", chunk => {
      rawData += chunk;
    });
    response.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  })
  .on("error", error => {
    console.error(`Got error: ${error.message}`);
  });
