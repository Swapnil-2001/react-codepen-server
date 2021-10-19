import mongoose from "mongoose";

import Project from "../models/project.js";

export const createPen = async (req, res) => {
  const pen = req.body;
  const newPen = new Project({ ...pen, creator: req.userId });
  try {
    await newPen.save();
    res.status(201).json(newPen);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePen = async (req, res) => {
  const { id } = req.params;
  const { name, creator, likes, html, css, js } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No pen with id: ${id}`);
  const updatedPen = { name, creator, likes, html, css, js, _id: id };
  try {
    await Project.findByIdAndUpdate(id, updatedPen, { new: true });
    res.json(updatedPen);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
