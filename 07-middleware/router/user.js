const router = require("express").Router();

router.post("/login", (_req, res) => {
	res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

module.exports = router;
