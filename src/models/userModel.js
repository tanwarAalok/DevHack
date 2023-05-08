const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  password: { type: String, required: true },
  upi: String,
  role: { type: String, required: true, enum: ["worker", "user", "admin"] },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});
mongoose.models = {};
module.exports = mongoose.model("User", UserSchema);