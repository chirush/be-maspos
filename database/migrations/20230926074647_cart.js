exports.up = function (knex) {
  return knex.schema.createTable("cart", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("user_id").index().unsigned();
    table.integer("product_id").index().unsigned();
    table.integer("quantity");
    table.integer("sub_total");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cart");
};
