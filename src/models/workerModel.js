const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  number: { type: String, required: true },
  category: {
    type: String,
    enum: ["plumber", "electrician", "labourer"],
  },
  wage: String,
  upi: String,
  photo: String,
  role: { type: String, required: true, enum: ["worker", "user", "admin"] },
  verified: { type: Boolean, default: false }
});
mongoose.models = {};
module.exports = mongoose.model("Worker", WorkerSchema);
