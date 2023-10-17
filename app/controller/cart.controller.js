const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

const index = async (req, res) => {
  try {
    const userid = req.user.id;
    const carts = await Cart.query().where('user_id', userid).join('product', 'product.id', '=', 'cart.product_id').select('cart.id', 'cart.user_id', 'cart.product_id', 'product.name', 'product.price', 'product.image', 'cart.quantity', 'cart.sub_total', 'cart.created_at');

    let total = 0;

    carts.forEach((item) => {
      total += item.sub_total;
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: carts,
      total: total,
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
  	const quantity = 1;

  	const product = await Product.query().where('id', product_id).first();
  	const price = product.price;

  	const sub_total = price*quantity;

    let cartCheck = await Cart.query().where("product_id", req.body.product_id).first();
    if (cartCheck){
      const sub_total = price*(cartCheck.quantity+1);
      const quantity = cartCheck.quantity+1;

      const cartUpdate = await Cart.query()
        .findById(cartCheck.id)
        .patch({
          quantity: quantity,
          sub_total: sub_total,
        });

      return res.status(200).json({
        status: 200,
        message: "Cart has been updated!",
      });
    }

    const cart = await Cart.query().insert({
      user_id: userid,
      product_id: req.body.product_id,
      quantity: 1,
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
    let cart = await Cart.query().where("product_id", req.body.product_id).first();
    const counter = req.body.counter;
    if (counter == "inc"){
      const quantity = cartCheck.quantity+1;
      const sub_total = price*quantity;

      const cartUpdate = await Cart.query()
        .findById(cart.id)
        .patch({
          quantity: quantity,
          sub_total: sub_total,
        });
    }else{
      const quantity = cartCheck.quantity-1;
      const sub_total = price*quantity;

      const cartUpdate = await Cart.query()
        .findById(cart.id)
        .patch({
          quantity: quantity,
          sub_total: sub_total,
        });
    }

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
