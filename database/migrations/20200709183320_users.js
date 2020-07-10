
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments('id').unique().notNullable();
        tbl.text('email').notNullable();
        tbl.text('password').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
