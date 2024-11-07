const postsTable = 'posts';

exports.up = async function (knex) {
  await knex.schema.createTable(postsTable, function (table) {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username').notNullable();

    table.json('metadata').notNullable().defaultTo('{}');
    table.string('mediaKey').notNullable();

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${postsTable}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = async function (knex) {
  await knex.schema.dropTable(postsTable);
};
