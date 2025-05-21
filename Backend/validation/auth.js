import Joi from "joi";

const addressSchema = Joi.object({
  street: Joi.string().allow("", null),
  city: Joi.string().allow("", null),
  state: Joi.string().allow("", null),
  postal_code: Joi.string().allow("", null),
  country: Joi.string().allow("", null),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().allow("", null),
  address: addressSchema.optional(),
  role: Joi.string().valid("admin", "user").optional(),
});

export default registerSchema;
