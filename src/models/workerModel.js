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
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  totalServices: { type: Number, default: 0 },
  bookings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}]
});

mongoose.models = {};
module.exports = mongoose.model("Worker", WorkerSchema);
