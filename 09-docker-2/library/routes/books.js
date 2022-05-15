const router = require("express").Router();
const fileMiddleware = require("../middleware/file");

const Book = require("../models/Book");

const { books } = require("./store");

const props = [
	"title",
	"description",
	"authors",
	"favorite",
	"fileCover",
	"fileName",
];

router.get("/view", (_req, res) => {
	res.render("books/index", { title: "Книги", books: books });
});

router.get("/view/:id", (req, res) => {
	const { id } = req.params;
	const book = books.find((b) => b.id === id);

	if (book) {
		res.render("books/view", { title: "Просмотр книги", book: book });
	} else {
		res.status(404).redirect("/404");
	}
});

router.get("/create", (_req, res) => {
	res.render("books/create", { title: "Добавление книги", book: {} });
});

router.post("/create", fileMiddleware.single("fileBook"), (req, res) => {
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

	res.redirect("/books/view");
});

router.get("/update/:id", (req, res) => {
	const { id } = req.params;
	let book = books.find((b) => b.id === id);

	if (book) {
		res.render("books/update", {
			title: "Редактирование книги",
			book: book,
		});
	} else {
		res.status(404).redirect("/404");
	}
});

router.post("/update/:id", fileMiddleware.single("fileBook"), (req, res) => {
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

		res.redirect("/books/view/" + id);
	} else {
		res.status(404).redirect("/404");
	}
});

router.post("/delete/:id", (req, res) => {
	const { id } = req.params;
	const index = books.findIndex((b) => b.id === id);

	if (index !== -1) {
		books.splice(index, 1);
		res.status(200).redirect("/books/view");
	} else {
		res.status(404).redirect("/404");
	}
});

module.exports = router;
