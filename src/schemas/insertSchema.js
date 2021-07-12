import joi from "joi";

const insertSchema = joi.object({
  text: joi.string().required(),
});

export { insertSchema };