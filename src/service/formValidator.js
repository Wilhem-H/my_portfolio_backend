const Joi = require("joi");

const formSchema = Joi.object({
  firstname: Joi.string().max(99),
  lastname: Joi.string().max(99),
  mail: Joi.string().email().max(255).required(),
  message: Joi.string().max(340).required(),
});

const formValidator = (req, res, next) => {
  const { firstname, lastname, mail, message } = req.body;

  const { error } = formSchema.validate(
    { firstname, lastname, mail, message },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).send("Données incorrectes");
  } else {
    next();
  }
};

module.exports = formValidator;
