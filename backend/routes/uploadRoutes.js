import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const checkFileType = (file, cb) => {
	const filetypes = /jpg|jpeg|png/;
	const isExtname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const isMimetype = filetypes.test(file.mimetype);

	if (isExtname && isExtname) {
		return cb(null, true);
	} else {
		return cb('Images only! Support only JPG/JPEG/PNG!');
	}
};

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;
