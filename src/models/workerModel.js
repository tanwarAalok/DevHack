const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  number: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["plumber", "electrician", "labourer"],
  },
  wage: { type: String, required: true },
  upi: { type: String, required: true },
  photo: { type: String },
  role: { type: String, required: true, enum: ["worker", "user", "admin"] },
});
mongoose.models = {};
module.exports = mongoose.model("Worker", WorkerSchema);
