module.exports = function (app) {
  var homeRoutes = App.route('homeRoutes');
  app.get('/', homeRoutes.home);

  var aboutRoutes = App.route('aboutRoutes');
  app.get('/about', aboutRoutes.about);

  var contactRoutes = App.route('contactRoutes');
  app.get('/contact', contactRoutes.contact);
}