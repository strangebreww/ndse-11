#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const handlers = {
	year: {
		get: Date.prototype.getFullYear,
		set: Date.prototype.setFullYear,
	},
	month: {
		get: Date.prototype.getMonth,
		set: Date.prototype.setMonth,
	},
	day: {
		get: Date.prototype.getDate,
		set: Date.prototype.setDate,
	},
};

const options = Object.keys(handlers);

yargs(hideBin(process.argv))
	.command(
		"current [--year|-y] [--month|-m] [--day|-d]",
		"print current date in ISO format",
		function (yargs) {
			return yargs
				.option("year", {
					alias: "y",
					describe: "Get year",
					type: "boolean",
				})
				.option("month", {
					alias: "m",
					describe: "Get month",
					type: "boolean",
				})
				.option("day", {
					alias: "d",
					describe: "Get day of the month",
					type: "boolean",
				});
		},
		function (argv) {
			const today = new Date();

			console.log("current date", today.toISOString());

			for (const datePart in argv) {
				if (options.includes(datePart)) {
					console.log(datePart, handlers[datePart].get.call(today));
				}
			}
		}
	)
	.command(
		"add [--year|-y] [--month|-m] [--day|-d]",
		"add date and print",
		function (yargs) {
			return yargs
				.option("year", {
					alias: "y",
					describe: "Add years",
					type: "number",
				})
				.option("month", {
					alias: "m",
					describe: "Add months",
					type: "number",
				})
				.option("day", {
					alias: "d",
					describe: "Add days",
					type: "number",
				});
		},
		function (argv) {
			modifyCurrentDate(argv, "add");
		}
	)
	.command(
		"sub [--year|-y] [--month|-m] [--day|-d]",
		"subtract date and print",
		function (yargs) {
			return yargs
				.option("year", {
					alias: "y",
					describe: "Subtract years",
					type: "number",
				})
				.option("month", {
					alias: "m",
					describe: "Subtract months",
					type: "number",
				})
				.option("day", {
					alias: "d",
					describe: "Subtract days",
					type: "number",
				});
		},
		function (argv) {
			modifyCurrentDate(argv, "sub");
		}
	).argv;

function modifyCurrentDate(argv, action = "add") {
	const resultDate = new Date();

	for (const datePart in argv) {
		if (options.includes(datePart)) {
			const diff = action === "sub" ? -argv[datePart] : argv[datePart];

			handlers[datePart].set.call(
				resultDate,
				handlers[datePart].get.call(resultDate) + diff
			);
		}
	}

	const message =
		action === "sub" ? "date in the past" : "date in the future";

	console.log(message, resultDate.toISOString());
}
