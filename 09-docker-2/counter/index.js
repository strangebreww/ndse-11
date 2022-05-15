const express = require("express");

const app = express();

const counter = {};

app.post("/counter/:bookId/incr", (req, res) => {
	const { bookId } = req.params;

	counter[bookId] = counter[bookId] === undefined ? 1 : counter[bookId] + 1;

	res.status(201).json({ counter });
});

app.get("/counter/:bookId", (_req, res) => {
	res.status(200).json({ counter });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
