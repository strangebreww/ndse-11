const express = require("express");
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error");
const indexRouter = require("./routes/index");
const booksRouter = require("./routes/books");
const userApiRouter = require("./routes/api/user");
const booksApiRouter = require("./routes/api/books");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/User");

const app = express();

app.set("view engine", "ejs");

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
	expressSession({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/api/user", userApiRouter);
app.use("/api/books", booksApiRouter);

app.use(errorMiddleware);

async function verify(username, password, done) {
	try {
		const user = await User.findOne({ login: username }).select("-__v");

		if (!user) {
			return done(null, false);
		}

		if (user.password !== password) {
			return done(null, false);
		}

		return done(null, user);
	} catch (e) {
		return done(e);
	}
}

const options = {
	usernameField: "username",
	passwordField: "password",
	passReqToCallback: false,
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser(function (user, cb) {
	cb(null, user["_id"]);
});

passport.deserializeUser(async function (id, cb) {
	try {
		const user = await User.findById(id).select("-__v");

		cb(null, user);
	} catch (e) {
		return cb(e);
	}
});

const port = process.env.PORT || 3000;
const dbName = process.env.DB_NAME || "library_service";

async function start() {
	try {
		const UrlDb = `mongodb://mongo:27017/${dbName}`;
		await mongoose.connect(UrlDb);

		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	} catch (e) {
		console.log(e);
	}
}

start();
