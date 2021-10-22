import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fontSize: { type: Number, required: true },
  theme: { type: String, required: true },
  lineNumbers: { type: Boolean, required: true },
});

export default mongoose.model("User", userSchema);
