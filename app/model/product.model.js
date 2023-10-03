const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Product extends Model {
  static get tableName() {
    return "product";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "category_id", "price", "image"],

      properties: {
        name: {
          type: "string",
        },
        category_id: {
          type: "integer",
        },
        price: {
          type: "integer",
        },
        image: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Product;
