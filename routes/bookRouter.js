import express from "express";
import { addBook, deleteBook, getAllBook, updateBook } from "../controller/bookController.js";
import { isAdmin, isStaff } from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/getBooks", getAllBook);
router.post("/updateBooks", isStaff, isAdmin, updateBook)
router.post("/add", isStaff, isAdmin, addBook);
router.delete("/delete", isAdmin, isStaff, deleteBook);

export default router;
