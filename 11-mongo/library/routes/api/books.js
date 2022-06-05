const router = require("express").Router();
const fileMiddleware = require("../../middleware/file");
const path = require("path");

const Book = require("../../models/Book");

const { books } = require("../store");

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

router.post("/", fileMiddleware.single("fileBook"), (req, res) => {
	const newBook = new Book();

	const { body, file } = req;

	props.forEach((p) => {
		if (body[p] !== undefined) {
			newBook[p] = body[p];
		}
	});

	if (file) {
		newBook.fileBook = file.path;
	}

	books.push(newBook);

	res.status(201).json(books.at(-1));
});

router.put("/:id", fileMiddleware.single("fileBook"), (req, res) => {
	const { id } = req.params;
	let book = books.find((b) => b.id === id);

	if (book) {
		const { body, file } = req;

		props.forEach((p) => {
			if (body[p] !== undefined) {
				book[p] = body[p];
			}
		});

		if (file) {
			book.fileBook = file.path;
		}

		res.status(200).json(book);
	} else {
		res.status(404).send("not found");
	}
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const index = books.findIndex((b) => b.id === id);

	if (index !== -1) {
		books.splice(index, 1);
		res.status(200).send("ok");
	} else {
		res.status(404).send("not found");
	}
});

router.get("/:id/download", (req, res) => {
	const { id } = req.params;
	const book = books.find((b) => b.id === id);

	if (book) {
		res.download(path.join(__dirname, "../..", book.fileBook), (err) => {
			if (err) {
				res.status(404).send("not found");
			}
		});
	} else {
		res.status(404).send("not found");
	}
});

module.exports = router;
