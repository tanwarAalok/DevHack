const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: {type: String, required: true},
  number: { type: String, required: true },
  category: {type: String, required: true},
  wage: {type: String, required: true},
  upi: { type: String, required: true },
  photo: { type: String },
  role: {type: String, required: true}
});
mongoose.models = {};
module.exports = mongoose.model("Worker", WorkerSchema);
