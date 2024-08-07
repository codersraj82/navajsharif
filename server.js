/* 
?   Step-1 import required module
?   step-2 create Server
?   step-3 read request and response
*/

//! Step-1 import required module
const http = require("http");
const fs = require("fs");
const path = require("path");
const indexHtml = fs.readFileSync("./public/index.html", "utf-8");
//! Step-2 create Server
let contentType;
const server = http.createServer((req, res) => {
  //? Create file path
  //pretier-ignore
  // Normalize the URL to avoid directory traversal attacks
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  //?check for file extension
  const extname = path.extname(filePath);
  console.log(extname);
  // Select content type as per file extension
  // Set the default content type
  contentType = "text/html";

  //switch statement for selction of content type

  //   switch (extname) {
  //     case ".css":
  //       contentType: "text/css";
  //       break;
  //     case ".jpg":
  //       contentType: "text/jpeg";
  //       break;
  //   }
  //! Step-3 Read request and response
  // Read File for error
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (error, errorContent) => {
            res.writeHead(404, { "content-type": "text/html" });
            res.end(errorContent, "utf-8");
          }
        );
      } else {
        res.writeHead(500);
        res.end(`server error ${err.code}`);
      }
    } else {
      if (extname === ".css") {
        contentType = "text/css";
      } else if (extname === ".jpg") {
        contentType = "text/jpeg";
      } else {
        contentType = "text/html";
      }
      console.log(contentType);
      res.writeHead(200, { "content-type": contentType });
      res.end(content, "utf-8");
    }
  });
});
//Start server for listening
server.listen(5000, "127.0.0.1", () => {
  console.log(`Server is listening on Port : ${5000}`);
});
