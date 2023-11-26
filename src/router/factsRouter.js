import express from "express";
import { insertFact } from "../model/facts/FactsModel.js";
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

// update facts

// delete facts

export default router;
