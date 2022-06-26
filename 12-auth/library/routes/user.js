const router = require("express").Router();

router.get("/login", function (_req, res) {
	res.render("user/login");
});

router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

router.get(
	"/me",
	function (req, res, next) {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			if (req.session) {
				req.session.returnTo = req.originalUrl || req.url;
			}
			return res.redirect("/login");
		}
		next();
	},
	function (req, res) {
		res.render("user/me", { user: req.user });
	}
);

module.exports = router;
