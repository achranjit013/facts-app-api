import express from "express";
import {
  deleteFact,
  getAllFacts,
  getAllFactsByUserId,
  insertFact,
  updateFactById,
  updateVotesByFactId,
} from "../model/facts/FactsModel.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// read facts - before logged in
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

// update votes of fact - before logged in
router.patch("/", async (req, res, next) => {
  try {
    const { _id, votesType, votesCount } = req.body;
    const result = await updateVotesByFactId(_id, { [votesType]: votesCount });

    result?._id
      ? res.json({
          status: "success",
          message: "The vote has been updated",
        })
      : res.json({
          status: "error",
          message: "Error, unable to update the vote. Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

// create or insert facts - for logged user
router.post("/", userAuth, async (req, res, next) => {
  try {
    const result = await insertFact({ ...req.body, userId: req.userId });

    result?._id
      ? res.json({
          status: "success",
          message:
            "Congratulations! Your fact has been posted. People around the world can now engage with it.",
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

// update facts - for logged user
router.patch("/user-dashboard", userAuth, async (req, res, next) => {
  try {
    const { _id, fact, source, category } = req.body;
    const result = await updateFactById(_id, { fact, source, category });

    result?._id
      ? res.json({
          status: "success",
          message: "Congratulations! Your fact has been updated.",
        })
      : res.json({
          status: "error",
          message: "Sorry, unable to update the fact. Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

// delete facts - for logged user
router.delete("/", userAuth, async (req, res, next) => {
  try {
    const { idArr } = req.body;
    const result = await deleteFact(idArr);

    result?.deletedCount
      ? res.json({
          status: "success",
          message: "The fact has been deleted!",
        })
      : res.json({
          status: "error",
          message: "Error, unable to delete the fact. Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
