const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

//schema
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, unique: true },
    role: { type: String, default: "manager" },
  },
  { timestamps: true }
);

usersSchema.plugin(passportLocalMongoose);

//model
const User = new mongoose.model("User",usersSchema);

module.exports = User;
