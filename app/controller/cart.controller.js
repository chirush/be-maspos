const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

const index = async (req, res) => {
  try {
    const userid = req.user.id;
    const carts = await Cart.query().where('user_id', userid);

    res.status(200).json({
      status: 200,
      message: "OK",
      data: carts,
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
    const userid = req.user.id;
  	const product_id = req.body.product_id;
  	const quantity = req.body.quantity;

  	const product = await Product.query().where('id', product_id).first();
  	const price = product.price;

  	const sub_total = price*quantity;

    const cart = await Cart.query().insert({
      user_id: userid,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      sub_total: sub_total,
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: cart,
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
    const cart = await Cart.query()
      .findById(req.params.id);

  	const product_id = cart.product_id;
  	const quantity = req.body.quantity;

  	const product = await Product.query().where('id', product_id).first();
  	const price = product.price;

  	const sub_total = price*quantity;

  	await cart.$query().patch({
        	quantity: req.body.quantity,
        	sub_total: sub_total,
  	});

      res.status(200).json({
        status: 200,
        message: "OK",
        data: cart,
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
    const cart = await Cart.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const transaction = async (req, res) => {
  try {
    const userid = req.user.id;
    const cart_item = await Cart.query().where('user_id', userid).select('product_id', 'quantity', 'sub_total');
    const cart_data = [];

    let total = 0;

    cart_item.forEach((item) => {
      cart_data.push({
        product_id: item.product_id,
        quantity: item.quantity,
        sub_total: item.sub_total,
      });

      total += item.sub_total;
    });

    console.log(cart_data);

    const cart = await Cart.query().insert({
      user_id: userid,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      sub_total: sub_total,
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: cart,
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
