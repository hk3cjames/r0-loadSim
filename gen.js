const http = require("http");
const fs = require("fs");
const port = 3601;
const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("rssync.html", function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("Error: File not found");
    } else {
      res.write(data);
    }
    res.end();
  });
});
var crypto = require("crypto");

server.listen(port, async function (error) {
  const start = Date.now();
  console.log(start);
  if (error) {
    console.log("something wrong", error);
  } else {
    console.log(Date.now() - start);
    console.log("rs1 sync server is listening on port " + port);
    console.log(Date.now() - start);
  }
  var irs = 10;
  var ips = 1000;
  var itc = 10000;
  var hash_data;
  var hashdisplay;

  for (ips = 1000; ips < 1010; ips++) {
    console.clear();
    console.log("\x1b[32m");


    for (its = 1000; its < 1050; its++) {
    console.log(
      " RS  PS   TS   tick" +
        "   hash code                                                         " +
        "rbas time      " +
        "elapse"
    );


      for (itc = 100000; itc < 100010; itc++) {
        hash_data = " " + ips + " " + its + " " + itc;
        hashdisplay = await crypto
          .createHash("sha256")
          .update(hash_data)
          .digest("hex");

        console.log(
          " " +
            irs +
            " " +
            hash_data +
            " " +
            hashdisplay +
            "  " +
            Date.now() +
            "  " +
            (Date.now() - start)
        );
      }
    }
  }
});
