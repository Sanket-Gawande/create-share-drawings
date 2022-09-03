import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};
// paintings schema
const paintingScheme = mongoose.Schema({
  name: String,
  content: {
    type: String,
    default: '{"lines":[],"width":1000,"height":700}',
  },
  owner: String,
  id: { ...reqString, unique: true },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});
const userSchema = mongoose.Schema({
  name: String,
  username: { ...reqString, unique: true },
  password: reqString,
  joinedOn: {
    type: Date,
    default: Date.now(),
  },
  paintings: [paintingScheme],
  shared: [paintingScheme],
});

export const userModel = mongoose.model("user", userSchema);
