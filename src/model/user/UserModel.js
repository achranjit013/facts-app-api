import UserSchema from "./UserSchema.js";

// insert user -> while sign-up
export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};

// get user by email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};
