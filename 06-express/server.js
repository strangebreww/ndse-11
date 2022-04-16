const express = require("express");
const formData = require("express-form-data");

const Book = require("./models/Book");

const app = express();
app.use(formData.parse());

let books = new Array(3).fill(null).map(() => new Book());

const props = [
	"title",
	"description",
	"authors",
	"favorite",
	"fileCover",
	"fileName",
];

app.post("/api/user/login", (_req, res) => {
	res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", (_req, res) => {
	res.status(200).json(books);
});

app.get("/api/books/:id", (req, res) => {
	const { id } = req.params;
	const book = books.find((b) => b.id === id);

	if (book) {
		res.status(200).json(book);
	} else {
		res.status(404).send("not found");
	}
});

app.post("/api/books", (req, res) => {
	const newBook = new Book();

	props.forEach((p) => {
		if (req.body[p] !== undefined) {
			newBook[p] = req.body[p];
		}
	});

	books.push(newBook);

	res.status(201).json(books.at(-1));
});

app.put("/api/books/:id", (req, res) => {
	const { id } = req.params;
	let book = books.find((b) => b.id === id);

	if (book) {
		props.forEach((p) => {
			if (req.body[p] !== undefined) {
				book[p] = req.body[p];
			}
		});

		res.status(200).json(book);
	} else {
		res.status(404).send("not found");
	}
});

app.delete("/api/books/:id", (req, res) => {
	const { id } = req.params;

	books = books.filter((b) => b.id !== id);

	res.status(200).send("ok");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
