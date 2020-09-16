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

server.listen(port, function (error) {
  const start = Date.now();
  console.log(start);

  if (error) {
    console.log("something wrong", error);
  } else {
    console.log("rs1 sync server is listening on port " + port);
  }

  var irs;
  var ips;
  var its;
  var itc;
  k = 0;
  var hashdisplay;
  var hash_data;
  data = "[";
  fs.appendFileSync("hash.json", data);

  for (irs = 1; irs < 2; irs++) {
    for (ips = 1000; ips < 1001; ips++) {
      // console.clear();
      // console.log("\x1b[32m");
      // console.log(
      //   " RS  PS   TS   tick" +
      //     "   hash code                                                         " +
      //     "rbas time      " +
      //     "elapse"
      // );

      for (its = 1000; its < 2000; its++) {
        // timeNow = Date.now();
        // timeTake = timeNow - start;
        // data = "\n"+ hashdisplay+ "  " + hash_data + "  " +timeTake;

        // console.log(
        //   " " +
        //     irs +
        //     "  " +
        //     hash_data +
        //     "  " +
        //     hashdisplay +
        //     "  " +
        //     timeNow +
        //     "  " +
        //     timeTake
        // );

        k = " " + ips + " " + its + " ";
        for (itc = 10000; itc < 10001; itc++) {
          hash_data = k + itc;

          hashdisplay = crypto
            .createHash("sha256")
            .update(hash_data)
            .digest("hex");
        }
        data =
          '{"hash":' +
          '"' +
          hashdisplay +
          '",' +
          ' "from":' +
          '"' +
          hash_data +
          '"},';
        fs.appendFileSync("hash.json", data);
      }
    }
  }


  timeNow = Date.now();
  timeTake = timeNow - start;
  console.log(timeNow);
  console.log(timeTake);

  data = "]" + "\n" + start + "  " + timeTake;

  fs.appendFileSync("hash.json", data);
});
