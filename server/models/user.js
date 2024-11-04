import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!*?&]{8,}$/.test(
          value
        );
      },
    },
    massage:
    "Password must conatain atleast one lowercase letter, uppercase letter, a number and special charactor",
  },
 
});

userSchema.methods.matchPasswords = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}

export default mongoose.model("User", userSchema)