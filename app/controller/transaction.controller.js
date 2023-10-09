const Cart = require("../model/cart.model");
const Transaction = require("../model/transaction.model");
const DetailTransaction = require("../model/detail_transaction.model");

const index = async (req, res) => {
  try {
    const userid = req.user.id;
    const transactions = await Transaction.query().where('user_id', userid);

    res.status(200).json({
      status: 200,
      message: "OK",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const detail = async (req, res) => {
  try {
    const transaction_id = req.params.id;
    const detail_transactions = await DetailTransaction.query().where('transaction_id', transaction_id)
    .join('product', 'product.id', '=', 'detail_transaction.product_id').select('detail_transaction.id', 'detail_transaction.transaction_id', 'detail_transaction.product_id', 'product.name', 'product.price', 'product.image', 'detail_transaction.quantity', 'detail_transaction.sub_total', 'detail_transaction.created_at');

    let total = 0;

    detail_transactions.forEach((item) => {
      total += item.sub_total;
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: detail_transactions,
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
    const cart_item = await Cart.query().where('user_id', userid).select('id', 'product_id', 'quantity', 'sub_total');
    const cart_data = [];

    let total = 0;

    cart_item.forEach((item) => {
		cart_data.push({
			id: item.id,
			product_id: item.product_id,
			quantity: item.quantity,
			sub_total: item.sub_total,
		});
      
    	total += item.sub_total;
    });

    if(total == 0){
      return res.status(400).json({
        message: "Theres nothing on the Cart!",
      });
    }else{
      const transaction = await Transaction.query().insert({
  		user_id: userid,
  		total: total,
      });

      const transaction_id = transaction.id;

    	for (const item of cart_data) {
    		await DetailTransaction.query().insert({
    			transaction_id: transaction_id,
    			product_id: item.product_id,
    			quantity: item.quantity,
    			sub_total: item.sub_total,
    	});

  		await Cart.query().deleteById(item.id);
  	  }

      res.status(200).json({
        status: 200,
        message: "OK",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  index,
  detail,
  store,
};
