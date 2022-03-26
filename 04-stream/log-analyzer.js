#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const file = path.join(process.argv.slice(2)[0]);

const readerStream = fs.createReadStream(file);

readerStream.setEncoding("utf8");

let content = "";

readerStream.on("data", (chunk) => {
	content = content + chunk;
});

readerStream.on("close", () => {
	printStats(getStats(content));
});

readerStream.on("error", (err) => {
	throw new Error(err);
});

function getStats(content) {
	const results = content
		.split("\n")
		.slice(0, -1)
		.map((r) => {
			try {
				return JSON.parse(r);
			} catch (e) {
				console.log(e.message);
			}
		});

	const stats = results.reduce(
		(acc, val) => {
			acc.total = acc.total + 1;

			if (val.win) {
				acc.won = acc.won + 1;
			} else {
				acc.lost = acc.lost + 1;
			}

			return acc;
		},
		{
			total: 0,
			won: 0,
			lost: 0,
		}
	);

	return stats;
}

function printStats(stats) {
	const percentWon = Math.round((stats.won * 100) / stats.total);

	console.log("Общее количество партий:", stats.total);
	console.log("Выигранных:", stats.won);
	console.log("Проигранных:", stats.lost);
	console.log("Процентное соотношение выигранных:", `${percentWon}%`);
}
