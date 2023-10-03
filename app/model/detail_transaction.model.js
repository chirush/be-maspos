const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class DetailTransaction extends Model {
  static get tableName() {
    return "detail_transaction";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["transaction_id", "product_id", "quantity", "sub_total"],

      properties: {
        transaction_id: {
          type: "integer",
        },
        product_id: {
          type: "integer",
        },
        quantity: {
          type: "integer",
        },
        sub_total: {
          type: "integer",
        },
      },
    };
  }
}

module.exports = DetailTransaction;
