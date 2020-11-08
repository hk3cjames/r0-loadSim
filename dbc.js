// TS simulatoe send 1000 hash to PS per second
const express = require("express");
const app = express();
const fetch = require("node-fetch");
var crypto = require("crypto");
console.log("connect to DBc at localhost:3200");

var res1 = {};
let psKey = [];
psName = [];
tsIn = [];
linkHash = ""; // link to DBc

let i = 0;
let j = 0;
let k = 0;
// PSID = "RBAS.ps";
// for (i = 0; i < 1000; i++) {
// 	k = 1000 + i;
// 	j = PSID + k;
// 	psInCount[i] = 0;
// 	psName[i] = j; // j: name to gen initial hash key
// 	psKey[i] = crypto.createHash("sha256").update(j).digest("hex");
// 	psKeyOriginal[i] = psKey[i]; // initial key
//   }
for (i = 0; i < 1000; i++) {
	k = 1000 + i;
	j = "RBAS.ps" + k;
	psName[i] = j;  // initial hash links for all PS
	psKey[i] = crypto.createHash("sha256").update(j).digest("hex");
	tsIn[i] = " ";
}

async function intervalFunc() {

	for (i = 1; i < 1000; i++) {
		if (tsIn[i] !== "") {
		  tHashIn = tsIn[i]
		  tNameIn = tsName[i]
		  hashToDBc[cycleCount] = {tsHashS: tHashIn, tsNameS:tNameIn };
		  cycleCount++;
		}
		dashboardDisp[i] = tsIn[i];  
		tsIn[i] = "";
	  }
	



	for (i = 1001; i < 2000; i++) {
tsId = "ts-" + i;
	chainId = document.form1.chainId.value;
	tHash = document.form2.hash_view.value;
	const data = { tsId, chainId, tHash };
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	const res = await fetch("/hashFile", options);
	const disp = await res.json();
	console.log(disp);	
	}
}

setInterval(intervalFunc, 1000);
