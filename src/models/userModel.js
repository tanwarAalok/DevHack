const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  upi: { type: String, required: true },
  role: { type: String, required: true },
});
mongoose.models = {};
module.exports = mongoose.model("User", UserSchema);