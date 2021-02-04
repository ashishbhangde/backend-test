var mongoose = require('mongoose');
var accountSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
module.exports = mongoose.model('Accounts', accountSchema);