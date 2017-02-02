Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'home', controller: 'MainController'});
Router.route('/setting', {name: 'setting', controller: 'SettingController'});

MainController = RouteController.extend({
  action: function() {
  	this.render('home');
  }
});

SettingController = RouteController.extend({
  action: function() {
  	this.render('setting');
  }
});