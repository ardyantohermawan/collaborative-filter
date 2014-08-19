var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: String
});

var Model = mongoose.model('user', schema);

module.exports = Model;