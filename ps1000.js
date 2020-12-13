// TS simulatoe send 1000 hash to PS per second
const express = require("express");
const app = express();
const fetch = require("node-fetch");
var crypto = require("crypto");
console.log("connect to PS at localhost:3100");

var res1 = {};
let tsKey = [];
tsName = [];
tsIn = [];
linkHash = "";

let i = 0;
let j = 0;
let k = 0;

for (i = 0; i < 1000; i++) {
	k = 1000 + i;
	j = "RBAS.ps1000.ts" + k;
	tsName[i] = j;
	tsKey[i] = crypto.createHash("sha256").update(j).digest("hex");
	tsIn[i] = " ";
}

async function intervalFunc() {
	last = "submitted"
	for (i = 1; i < 1000; i++) {
		if (last == "submitted") {
			tsId = tsName[i];
			chainId = tsKey[i];
			tsKey[i] = crypto.createHash("sha256").update(chainId).digest("hex");
			tHash = tsKey[i];
		}

		const data = { tsId, chainId, tHash };
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		};
		res1 = await fetch("http://127.0.0.1:3100/hashFile", options);
		const disp = await res1.json();
		// console.log("send data json to PS")
		// console.log(data)
		// console.log("ready for next, completed sending to PS ");
		// console.log(disp);
	}
}

setInterval(intervalFunc, 1005);
