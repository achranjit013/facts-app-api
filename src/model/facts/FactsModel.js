import FactsSchema from "./FactsSchema.js";

// crud operations

// create or insert facts
export const insertFact = (factObj) => {
  return FactsSchema(factObj).save();
};

// read facts
// if logged in: facts of logged user only
// if not logged in: all facts

// update facts

// delete facts
