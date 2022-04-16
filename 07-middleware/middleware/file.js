const multer = require("multer");

const storage = multer.diskStorage({
	destination(_req, file, cb) {
		cb(null, "public/uploads");
	},
	filename(_req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const allowedTypes = ["plain/text", "text/html"];

const fileFilter = (_req, file, cb) => {
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

module.exports = multer({ storage, fileFilter });