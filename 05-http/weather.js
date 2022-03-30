const http = require("http");

const { API_KEY, CITY } = process.env;

const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${CITY}`;

http.get(url, (res) => {
	const { statusCode } = res;

	if (statusCode !== 200) {
		console.error(`Status code: ${statusCode}`);
		res.resume();
		return;
	}

	res.setEncoding("utf8");

	let rawData = "";

	res.on("data", (chunk) => {
		rawData = rawData + chunk;
	});

	res.on("end", () => {
		try {
			console.log(`Current weather in ${CITY}:`, JSON.parse(rawData));
		} catch (e) {
			console.error(e.message);
		}
	});
}).on("error", (e) => {
	console.error(`Got error: ${e.message}`);
});
