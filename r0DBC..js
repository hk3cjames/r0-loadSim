
async function intervalFunc() {
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
