var user = App.model('user');

exports.home = function home(req, res) {
  user.find({}, function (err, users){
  	if (err) return res.status(422).send('Problem loading records: ', err.message);

    res.render("home/home", {title: "home", userAttribute: users}); 	
  });

}