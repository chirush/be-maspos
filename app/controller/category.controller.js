const Category = require("../model/category.model");

const index = async (req, res) => {
  try {
    const categorys = await Category.query();

    res.status(200).json({
      status: 200,
      message: "OK",
      data: categorys,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    const category = await Category.query().insert({
      name: req.body.name,
    });

    res.status(200).json({
      status: 200,
      message: "Category has been added!",
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  try {
    const category = await Category.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
      });

      res.status(200).json({
        status: 200,
        message: "Category has been updated!",
        data: category,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const category = await Category.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Category has been deleted!",
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
