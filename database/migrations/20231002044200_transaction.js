exports.up = function (knex) {
  return knex.schema.createTable("transaction", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("user_id").index().unsigned();
    table.integer("total");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transaction");
};