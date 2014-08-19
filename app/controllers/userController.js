var User = App.model('user');

function create (req, res) {
	res.render('users/create');
}

function store (req, res) {
	var u = new User({ email: req.body.email, passwordHash: req.body.password});
	u.save(function(err){
		if (err) {
			return res.status(422).send('Problem: '+ err.message);
		} else {
			return res.status(200).send('Successfully created!');
		}
	});
}

exports.create = create;
exports.store = store;