const http = require("http");
const fs = require("fs");
const port = 3603;
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
		console.log(Date.now() - start);
		console.log("rs2 sync server is listening on port " + port);
		console.log(Date.now() - start);
	}
	var irs;
	var ips;
	var its;
	var itc;
	k = 0;
	var hashdisplay;

	for (irs = 1; irs < 10; irs++) {
		for (ips = 1000; ips < 1025; ips++) {
			console.clear();
			console.log("\x1b[32m");
			console.log(
				" RS  PS  TS   tick" +
					"    hash code                                                         " +
					"rbas time      " +
					"elapse"
			);
			for (its = 1000; its < 1050; its++) {
				console.log(
					" " +
						irs +
						"  " +
						ips +
						" " +
						its +
						" " +
						itc +
						"   " +
						hashdisplay +
						"  " +
						Date.now() +
						"  " +
						(Date.now() - start)
				);

				for (itc = 10000; itc < 10024; itc++) {
					secret = "0" + k;
					k = k + 1;
					hashdisplay = crypto
						.createHash("sha256")
						.update(secret)
						.digest("hex");
				}
			}
		}
	}
});
