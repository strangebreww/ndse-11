const express = require("express");
const formData = require("express-form-data");
const userRouter = require("./router/user");
const booksRouter = require("./router/books");

const app = express();

app.use(formData.parse());

app.use("/api/user", userRouter);

app.use("/api/books", booksRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
