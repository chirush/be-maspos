const Product = require("../model/product.model");

const index = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const products = await Product.query().where('category_id', category_id);

    res.status(200).json({
      status: 200,
      message: "OK",
      data: products,
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
    const product = await Product.query().insert({
      name: req.body.name,
      category_id: parseInt(req.body.category_id),
      price: parseInt(req.body.price),
      image: req.file.filename,
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: product,
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
    const product = await Product.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
        category_id: parseInt(req.body.category_id),
        price: parseInt(req.body.price),
        image: req.file.filename,
      });

      res.status(200).json({
        status: 200,
        message: "OK",
        data: product,
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
    const product = await Product.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK",
      data: product,
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
