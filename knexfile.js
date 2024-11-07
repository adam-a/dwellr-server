require('dotenv/config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

module.exports = {
  test: {
    client: 'postgresql',
    // connection: process.env.TEST_PGURL || 'postgres://dwellr:dwellrme@localhost:5432/dwellr_test',
  },

  development: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.PGURL,
      ssl: { rejectUnauthorized: false },
    },
  },
};
