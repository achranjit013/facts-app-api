import express from "express";
import {
  getAllFacts,
  getAllFactsByUserId,
  insertFact,
} from "../model/facts/FactsModel.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// create or insert facts
router.post("/", userAuth, async (req, res, next) => {
  try {
    const result = await insertFact({ ...req.body, userId: req.userId });

    result?._id
      ? res.json({
          status: "success",
          message:
            "Congratulations!!! Your fact has been posted. People around the world will now be able to engage with your fact.",
        })
      : res.json({
          status: "error",
          message:
            "Sorry, there was some problem while posting your fact. Please try again later or contact admin.",
        });
  } catch (error) {
    next(error);
  }
});

// read facts
router.get("/", async (req, res, next) => {
  try {
    const result = await getAllFacts();

    result?.length > 0
      ? res.json({
          status: "success",
          message:
            "Congratulations!!! You are successfull in getting facts list.",
          result,
        })
      : res.json({
          status: "error",
          message:
            "Sorry, there was some problem while retriving the facts. Please try again later or contact admin.",
        });
  } catch (error) {
    next(error);
  }
});

// read facts - for logged user
router.get("/user-dashboard", userAuth, async (req, res, next) => {
  try {
    const result = await getAllFactsByUserId(req.userId);

    result?.length > 0
      ? res.json({
          status: "success",
          message:
            "Congratulations!!! You are successfull in getting facts list.",
          result,
        })
      : res.json({
          status: "error",
          message:
            "Hi there, you haven't posted any facts yet. Please post a fact and get engaged with the world!",
        });
  } catch (error) {
    next(error);
  }
});

// update facts

// delete facts

export default router;
