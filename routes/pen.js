import express from "express";

const router = express.Router();

import auth from "../middleware/auth.js";
import { createPen, updatePen } from "../controllers/pen.js";

router.post("/create", auth, createPen);
router.patch("/save/:id", auth, updatePen);

export default router;
