module.exports = function (app) {
  var homeController = App.route('homeController');
  app.get('/', homeController.home);

  var aboutController = App.route('aboutController');
  app.get('/about', aboutController.about);

  var contactController = App.route('contactController');
  app.get('/contact', contactController.contact);
}