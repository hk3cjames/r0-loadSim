// TS simulatoe send 1000 hash to PS per second
const express = require("express");
const app = express();
const fetch = require("node-fetch");
var crypto = require("crypto");
console.log("connect to DBc at localhost:3200");

var res1 = {};
let psKey = [];
psName = [];
linkHash = []; // link to DBc
hashToDBc = [];
systemTick= 0;
PSID = "RBAS.ps";
let i = 0;
let j = 0;
let k = 0;

for (i = 0; i < 1000; i++) {
	k = 1000 + i;
	j = PSID + k;
	psName[i] = j;  // initial hash names for all PS
	psKey[i] = crypto.createHash("sha256").update(j).digest("hex");
	linkHash[i] = psKey[i]// initial hash links for all PS
}

async function intervalFunc() {
	for (i = 1    ; i < 1000; i++) {
		tick = systemTick
		psId = psName[i] 
		chainId = linkHash[i]
		// console.log(chainId)
		psCycleCount = 379;
		hashToDBc = []
		for (j=0; j<psCycleCount; j++){
			tsName = "RBAS.ps" + i +".ts"+ j + ".tick" + systemTick
			tHashIn = crypto.createHash("sha256").update(tsName).digest("hex");
			tNameIn = tsName
			hashToDBc[j] = { tsHashS: tHashIn, tsNameS: tNameIn }
		}
		tsHash = hashToDBc;
		// console.log("sim ps data to DB-C");
		// console.log(tsHash);

		const data = { tick, psId, chainId, psCycleCount, tsHash };
		// console.log("post json to DB-C")


		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};
		// res1 = await fetch("http://127.0.0.1:3200/hashFile", options); //to DB_c local host
		res1 = await fetch("http://127.0.0.1:3200/hashFile", options); //to DB_c pi 4
		const DBc1Replay = await res1.json();

		// console.log(DBc1Replay);
		// result = disp.status;
		// existHash = disp.hash;
		systemTick = DBc1Replay.tick    // sync system tick to DB-C
		linkHash[i] = DBc1Replay.nextChainId
	}
}

setInterval(intervalFunc, 1000);
