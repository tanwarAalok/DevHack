const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  time: { type: String, required: true },
  date: { type: String, required: true },
  address: {type: String, required: true},
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

mongoose.models = {};
module.exports = mongoose.model("Booking", BookingSchema);
