module.exports = function (mongoose) {

  let Schema = mongoose.Schema;
  let models = {};

  let CSV = require('./csv')(Schema);

// Associating Models with Schemas

  models.CSV = mongoose.model('CSV', CSV);

  return models;

};
