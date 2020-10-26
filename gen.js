const fs = require("fs");
console.clear();
console.log("\x1b[32m");
var hash = ""
time = Date.now()

function hexIn(digit) {
  switch(digit){
    case 0: return "0"
    case 1: return "1"
    case 2: return "2"
    case 3: return "3"

    case 4: return "4"
    case 5: return "5"
    case 6: return "6"
    case 7: return "7"

    case 8: return "8"
    case 9: return "9"
    case 10: return "a"
    case 11: return "b"

    case 12: return "c"
    case 13: return "d"
    case 14: return "e"
    case 15: return "f"
  }
}
hash_data = "tc0000"
hashOut = ""
ita=0
itb=0
itc=0
itd=0
ite=0
itaMax=16
itbMax=16
itcMax=16
itdMax=1
iteMax=1
function lasthash()  {
  // console.log("ita="+ ita + " itb="+itb+" itc="+itc+"itd="+itd)
  if (ita < (itaMax-1)) return false
  if (itb < (itaMax-1)) return false
  if (itc < (itaMax-1)) return false
  // if (itd < (itaMax-1)) return false
  // if (ite < (itaMax-1)) return false
  // console.log("last hash")
  return true
}
data = "[";
fs.appendFileSync("hash.json", data);
fs.unlinkSync("hash.json")
data = "[";
fs.appendFileSync("hash.json", data);
for (ita = 0; ita < itaMax; ita++) {
  for (itb = 0; itb < itbMax; itb++) {
    for (itc = 0; itc < itcMax; itc++) {
      for (itd = 0; itd < itdMax; itd++) {
        for (ite = 0; ite < iteMax; ite++) {
          hashOut = (hexIn(ita)) + hexIn(itb) + hexIn(itc) + hexIn(itd)+
          hexIn(ite)+ "00000000000" + "00000000"+"00000000" +
          "00000000" + "00000000" + "00000000"+"00000000" 
          // console.log(hashOut)
          data =
          '{"hash":' +
          '"' + hashOut+
          '",' +
          ' "from":' +
          '"' +
          hash_data +
          '"}';
          if (lasthash() == false) {data = data +","}
          fs.appendFileSync("hash.json", data);
        }
      }
    }

    };
  }
  data = "]";
  fs.appendFileSync("hash.json", data); 
total = Date.now()
console.log(total - time)
