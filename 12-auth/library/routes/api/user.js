const router = require("express").Router();
const passport = require("passport");

router.get("/login", function (req, res) {
	res.render("user/login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/api/user/login",
	}),
	function (req, res) {
		console.log("req.user: ", req.user);
		res.redirect("/");
	}
);

router.post("/signup", (_req, res) => {
	res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

router.get(
	"/me",
	function (req, res, next) {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			if (req.session) {
				req.session.returnTo = req.originalUrl || req.url;
			}
			return res.redirect("/api/user/login");
		}
		next();
	},
	function (req, res) {
		res.render("user/profile", { user: req.user });
	}
);

// router.get("/logout", function (req, res) {
// 	req.logout();
// 	res.redirect("/");
// });

module.exports = router;
