// TS simulatoe send 1000 hash to PS per second
const express = require("express");
const app = express();
const fetch = require("node-fetch");
var crypto = require("crypto");
console.log("listen at port 3010");
app.use(express.static("sim")); // output ts/index.html to :3000 get
app.use(express.json({ limit: "1mb" }));
app.listen(3010, () =>
	console.log("TS hash input at localhost:3010 ")
);

tick = 10000000000
cycletime = 500
state = 0
wait = 0
loopStart = 0;
lastloop = Date.now()

var res1 = {};
let tsKey = [];
tsName = [];
tsIn = [];
linkHash = "";
leadingHash = "0000000000000000"
hashIndex = 1000000000000000

let i = 0;
let j = 0;
let k = 0;

for (i = 0; i < 1000; i++) {
	k = 1000 + i;
	j = "ps1000.ts" + k;
	tsName[i] = j;
	tsKey[i] = crypto.createHash("sha256").update(j).digest("hex");
	tsIn[i] = "===";
}

async function hashToPS() {
	const data = { tsId, chainId, tHash };
	const options = {
		// timeout: 10000,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	};
	res1 = await fetch("http://127.0.0.1:3100/hashFile", options);
	// res1 = await fetch("http://192.168.31.46:3100/hashFile", options);
	// console.log("send data json to PS")
	// console.log(data)

	const disp = await res1.json();
	// console.log("response from PS ");
	// console.log(disp);
	tick = disp.tick
}


async function intervalFunc() {
	looptime = Date.now() - lastloop
	lastloop = Date.now()
	console.log(lastloop + ", " + tick + ", total sent in 0.5 sec = " + i)

	switch (state) {
		case 0:
			state++
			for (i = 0; i < 1000; i++) {
				tsId = tsName[i]
				chainId = tsKey[i]
				tHash = leadingHash + leadingHash + leadingHash + hashIndex
				hashToPS()			
				hashIndex++
			}
				break

		case 1:
			looptime = Date.now() - loopStart;
			t = Date.now() - lastloop
			console.log(tick + ", looptime= " + looptime + ", " + t);
			lastloop = Date.now()
			state = 0;

			break;

		default:
			state = 0
			break;
	}
}

console.log("program start")
setInterval(intervalFunc, cycletime);
