import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
    required: false,
    default: "",
  },
  lname: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  suburb: {
    type: String,
    required: true,
  },
  states: {
    type: String,
    required: true,
  },
  postcode: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: 1,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
