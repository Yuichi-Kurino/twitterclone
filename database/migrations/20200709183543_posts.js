
exports.up = function(knex) {
    return knex.schema.createTable('posts', (tbl) => {
        tbl.increments('id').unique().notNullable();
        tbl.text('message').notNullable();
        tbl.integer('user_id').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts');
};
