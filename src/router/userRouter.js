import express from "express";
import { getUserByEmail, insertUser } from "../model/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptHelper.js";

const router = express.Router();

// create (sign-up)
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const result = await insertUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message:
            "Congratulations!!! Your account has been created. You may login now.",
        })
      : res.json({
          status: "error",
          message:
            "Sorry, unable to create account. Please try again later or contact admin.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "Email already taken. Please try again with another email.";
      error.code = 200;
    }
    next(error);
  }
});

// create (login)
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if the user exists for the given email
    const result = await getUserByEmail(email);

    if (result?.password) {
      const isMatched = comparePassword(password, result.password);

      if (isMatched) {
        result.password = undefined;

        return res.json({
          status: "success",
          message: "Login successful!",
          user: result,
        });
      }
    }

    return res.json({
      status: "error",
      message: "Invalid login details. Please check your email or password!",
    });
  } catch (error) {
    next(error);
  }
});

// read

// update

// delete

export default router;
