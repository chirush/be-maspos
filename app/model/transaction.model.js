const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Transaction extends Model {
  static get tableName() {
    return "transaction";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "total"],

      properties: {
        user_id: {
          type: "integer",
        },
        total: {
          type: "integer",
        },
      },
    };
  }
}

module.exports = Transaction;
