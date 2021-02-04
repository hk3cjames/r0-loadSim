tick = 1000000000000000
tssendCount = 0
tsGoupSend = 0
psIP = document.form1.psIP.value
dbcIP = document.form2.dbcIP.value
dbtIP = document.form3.dbtIP.value
hash16 = document.form4.hashcode.value

function setPS() {
    psIP = document.form1.psIP.value
    console.log("ps ip address = " + psIP)
}
function setDBC() {
    dbcIP = document.form2.dbcIP.value
    console.log("dbc ip address = " + dbcIP)
}
function setDBT() {
    dbtIP = document.form3.dbtIP.value
    console.log("dbt ip address = " + dbtIP)
}
function setStartCode() {
    hash16 = document.form4.hashcode.value
    console.log("dashcode address = " + hash16)
}

function tsSend1() {
    tsSendCount++
}
function tsSend10() { 
    tsSendCount = tsSendCount + 100
}

function ts100() { 
    tsSendCount = tsSendCount + 10000
}
function tsStop() { 
    tsSendCount = 0
}
function tsxSend1() {tsGoupSend++}
function tsxStop() {tsGoupSend=0 }

function psSend1() { }
function psSend10() { }
function psContinue() { }
function psStop() { }
function psxSend1() { }
function psxStop() { }

function qsSend1() { }
function qsSend10() { }
function qsContinue() { }
function qsStop() { }
function qsxSend1() { }
function qsxStop() { }

async function sendOneHash(){
    const data = { tsId, chainId, tHash };
    const options = {
        timeout: 50,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    res1 = await fetch("http://127.0.0.1:3100/hashFile", options);
    const disp = await res1.json();
}

async function intervalFunc() {
    const d = new Date();
    var str = "" + d;
    time = str.substring(4, 24);
    document.getElementById("time").textContent = time;
    document.getElementById("cycle").textContent = tick;
    const data = { tsId, chainId, tHash };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch("/hashFile", options);
    const disp = await res.json();
}

setInterval(intervalFunc, 1000);