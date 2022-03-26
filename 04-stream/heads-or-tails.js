#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const fileName = process.argv.slice(2)[0];

if (!fileName) {
	throw new Error("No log file specified");
}

const logsDir = path.join(__dirname, "logs");

fs.mkdir(logsDir, (err) => {
	if (err) {
		if (err.code !== "EEXIST") {
			throw new Error(err);
		}
	}

	playTheGame(logsDir, fileName);
});

function playTheGame(logsDir, fileName) {
	console.log('Игра "Орёл или решка".\nВведите 1 или 2:');

	const secretNum = Math.floor(Math.random() * 2 + 1);

	rl.on("line", (data) => {
		const num = Number(data);

		if (isNaN(num) || (num !== 1 && num !== 2)) {
			console.log("Введите 1 или 2");
			return;
		}

		const result = {
			secret: secretNum,
			answer: num,
			win: num === secretNum,
			text: secretNum === 1 ? "Орёл" : "Решка",
			date: new Date().toISOString(),
		};

		console.log(
			result.text + ". " + (result.win ? "Угадали" : "Не угадали") + "!"
		);

		writeLog(path.join(logsDir, fileName), result);

		rl.close();
	});
}

function writeLog(file, data) {
	const content = JSON.stringify(data) + "\n";

	fs.appendFile(file, content, (err) => {
		if (err) {
			throw new Error(err);
		}
	});
}
