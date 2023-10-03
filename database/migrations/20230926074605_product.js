exports.up = function (knex) {
  return knex.schema.createTable("product", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("category_id").index().unsigned();
    table.string("name");
    table.integer("price");
    table.string("image");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("product");
};
