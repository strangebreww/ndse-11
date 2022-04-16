const router = require("express").Router();
const fileMiddleware = require("../middleware/file");

const Book = require("../models/Book");

let books = new Array(3).fill(null).map(() => new Book());

const props = [
	"title",
	"description",
	"authors",
	"favorite",
	"fileCover",
	"fileName",
];

router.get("/", (_req, res) => {
	res.status(200).json(books);
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	const book = books.find((b) => b.id === id);

	if (book) {
		res.status(200).json(book);
	} else {
		res.status(404).send("not found");
	}
});

router.post("/", (req, res) => {
	const newBook = new Book();

	props.forEach((p) => {
		if (req.body[p] !== undefined) {
			newBook[p] = req.body[p];
		}
	});

	books.push(newBook);

	res.status(201).json(books.at(-1));
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
	const { id } = req.params;

	books = books.filter((b) => b.id !== id);

	res.status(200).send("ok");
});

router.post("/upload", fileMiddleware.single("book"), (req, res) => {
	if (req.file) {
		const { path } = req.file;

		res.json(path);
	} else {
		res.json(null);
	}
});

module.exports = router;
