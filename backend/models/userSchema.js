import Mongoose from "mongoose";
const UserSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    mobile: {
      type: Number,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
        type: String,
        required: true,
      },
    address: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        
      },
  
   
  },
  { timestamps: true }
);

const User = Mongoose.model("User", UserSchema);
export default User;