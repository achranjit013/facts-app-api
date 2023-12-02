import mongoose from "mongoose";

const votesSchema = new mongoose.Schema({
  like: {
    type: Number,
  },
  dislike: {
    type: Number,
  },
  mindblowing: {
    type: Number,
  },
  factId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fact",
  },
});

export default mongoose.model("Vote", votesSchema);
