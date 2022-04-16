const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const userRouter = require("./router/user");
const booksRouter = require("./router/books");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/books", booksRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
