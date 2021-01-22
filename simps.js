// TS simulatoe send 1000 hash to DBc per second
const express = require("express");
const app = express();
const fetch = require("node-fetch");
var crypto = require("crypto");
console.log("connect to DBc at localhost:3200");
psCycleCount = 1100; // hash per json
var res1 = {};
let psKey = [];
psName = [];
linkHash = []; // link to DBc
hashToDBc = [];
systemTick= 0;

PSID = "RBAS.ps";
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

		res1 = await fetch("http://127.0.0.1:3200/hashFile", options); //to DB_c1 
		const DBc1Replay = await res1.json();
		systemTick = DBc1Replay.tick  
		linkHash[i] = DBc1Replay.nextChain
		res1 = await fetch("http://127.0.0.1:3201/hashFile", options); //to DB_c2 
		const DBc2Replay = await res1.json();
		systemTick = DBc2Replay.tick  
		linkHash[i] = DBc2Replay.nextChain
		// res1 = await fetch("http://127.0.0.1:3202/hashFile", options); //to DB_c3 
		// const DBc1Replay = await res1.json();
		// systemTick = DBc1Replay.tick  
		// linkHash[i] = DBc1Replay.nextChain
		// console.log(i + "x" + psCycleCount + " hash sent at tick = " + systemTick)
	}
}


setInterval(intervalFunc, 20000);
