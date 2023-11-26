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

// update facts

// delete facts
