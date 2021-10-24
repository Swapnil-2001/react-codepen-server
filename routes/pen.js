import express from "express";

const router = express.Router();

import auth from "../middleware/auth.js";
import {
  getPens,
  getStarredPens,
  createPen,
  updatePen,
  likePen,
  starPen,
  getPensByUser,
  getPenById,
} from "../controllers/pen.js";

router.get("/", getPens);
router.get("/starred/:id", getStarredPens);
router.get("/all/:creator", getPensByUser);
router.get("/:id", getPenById);

router.post("/create", auth, createPen);

router.patch("/save/:id", auth, updatePen);
router.patch("/like/:id", auth, likePen);
router.patch("/star/:id", auth, starPen);

export default router;
