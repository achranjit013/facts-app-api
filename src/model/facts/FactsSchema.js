import mongoose from "mongoose";

const factsSchema = new mongoose.Schema({
  fact: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  votesLike: {
    type: Number,
    default: 0,
  },
  votesDislike: {
    type: Number,
    default: 0,
  },
  votesMindblowing: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Fact", factsSchema);
