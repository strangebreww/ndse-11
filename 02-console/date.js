#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv)).command(
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
		const handlers = {
			year: Date.prototype.getFullYear,
			month: Date.prototype.getMonth,
			day: Date.prototype.getDate,
		};

		const keys = Object.keys(handlers);
		const today = new Date();

		console.log("current date", today.toISOString());

		for (const datePart in argv) {
			if (keys.includes(datePart)) {
				console.log(datePart, handlers[datePart].call(today));
			}
		}
	}
).argv;
