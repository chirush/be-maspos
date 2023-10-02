const { check, validationResult } = require("express-validator");

const store = [
  check("name").not().isEmpty().withMessage("Name can not be empty!"),
  check("category_id").not().isEmpty().withMessage("Category ID can not be empty!"),
  check("price").not().isEmpty().withMessage("Price can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const update = [
  check("name").not().isEmpty().withMessage("Name can not be empty!"),
  check("category_id").not().isEmpty().withMessage("Category ID can not be empty!"),
  check("price").not().isEmpty().withMessage("Price can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

module.exports = {
  store,
  update,
};
