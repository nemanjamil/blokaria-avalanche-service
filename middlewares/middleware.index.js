const cors = require('cors');
// const { database } = require('../config/database');

exports.middlewares = (app) => {
  // database();
  app.use(cors());
};
