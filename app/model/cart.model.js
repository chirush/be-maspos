const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Cart extends Model {
  static get tableName() {
    return "cart";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "product_id", "quantity"],

      properties: {
        name: {
          type: "integer",
        },
        product_id: {
          type: "integer",
        },
        quantity: {
          type: "integer",
        },
      },
    };
  }
}

module.exports = Cart;
