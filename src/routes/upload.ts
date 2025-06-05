import express from "express";
import { uploadFileHandler } from "../controllers/uploadController";
import multer from "multer";
import path from "path";

const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|txt|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
    }
  },
  limits: { fileSize: 10000000 }, // 10 MB
});

router.post("/", upload.single("file"), uploadFileHandler);

export default router;
