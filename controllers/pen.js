import mongoose from "mongoose";

import Project from "../models/project.js";

export const getPens = async (_, res) => {
  try {
    const pens = await Project.find().sort({ _id: -1 });
    res.json(pens);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPenById = async (req, res) => {
  const { id } = req.params;
  try {
    const pen = await Project.findById(id);
    res.status(200).json(pen);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPensByUser = async (req, res) => {
  const { creator } = req.params;
  try {
    const pens = await Project.find({ creator });
    res.json(pens);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
  const { name, creator, creatorUsername, likes, html, css, js } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No pen with id: ${id}`);
  const updatedPen = {
    _id: id,
    name,
    creator,
    creatorUsername,
    likes,
    html,
    css,
    js,
  };
  try {
    await Project.findByIdAndUpdate(id, updatedPen, { new: true });
    res.json(updatedPen);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const likePen = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No pen with id: ${id}`);
  try {
    const pen = await Project.findById(id);
    const index = pen.likes.findIndex((pId) => pId === String(req.userId));
    if (index === -1) pen.likes.push(req.userId);
    else pen.likes = pen.likes.filter((pId) => pId !== String(req.userId));
    const updatedPen = await Project.findByIdAndUpdate(id, pen, { new: true });
    res.status(200).json(updatedPen);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
