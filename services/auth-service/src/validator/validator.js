import Joi from 'joi';
import JoiPhoneNumber from 'joi-phone-number';
const CustomJoi = Joi.extend(JoiPhoneNumber);

const registerDataSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{2,30}$/),
  phoneNumber: CustomJoi.string().phoneNumber(),
  email: Joi.string().email({ minDomainAtoms: 2 })
});

const loginDataSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().regex(/^[a-zA-Z0-9]{2,30}$/)
});


const validateData = (data, schema) => {
  return Joi.validate(data, schema);
};

export {
  registerDataSchema,
  loginDataSchema,
  validateData
}