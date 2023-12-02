import FactsSchema from "./FactsSchema.js";

// crud operations

// create or insert facts
export const insertFact = (factObj) => {
  return FactsSchema(factObj).save();
};

// read facts
// if logged in: facts of logged user only
export const getAllFactsByUserId = (userId) => {
  return FactsSchema.find({ userId });
};

// if not logged in: all facts
export const getAllFacts = () => {
  return FactsSchema.find();
};

// update votes of fact - before logged in
export const updateVotesByFactId = (_id, data) => {
  return FactsSchema.findByIdAndUpdate(_id, data, { new: true });
};

// update facts  - after logged in
export const updateFactById = (_id, data) => {
  return FactsSchema.findByIdAndUpdate(_id, data, { new: true });
};

// delete facts
export const deleteFact = (idArr) => {
  return FactsSchema.deleteMany({ _id: { $in: idArr } });
};
