import mongoose from "mongoose";
import generateId from "../Utilities/GenerateId";

const User = new mongoose.Schema({
  id: { 
    type: String,
    default: generateId(),
  },
  username: String,
  role: String,
});

const UserModel = mongoose.model("User", User);

export default UserModel;
