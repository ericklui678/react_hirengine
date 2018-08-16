import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const schema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    passwordHash: String
  },
  { timestamps: true }
);

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRET
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    token: this.generateJWT()
  };
};

export default mongoose.model("User", schema);
