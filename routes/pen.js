import express from "express";

const router = express.Router();

import auth from "../middleware/auth.js";
import {
  getPens,
  createPen,
  updatePen,
  likePen,
  getPensByUser,
  getPenById,
} from "../controllers/pen.js";

router.get("/", getPens);
router.get("/all/:creator", getPensByUser);
router.get("/:id", getPenById);

router.post("/create", auth, createPen);

router.patch("/save/:id", auth, updatePen);
router.patch("/like/:id", auth, likePen);

export default router;
