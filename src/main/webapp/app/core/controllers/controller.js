define([
	'angular',
	'angularAMD',
	'core/controllers/route',
	'angular-route',
	'core/factories/factory'
], function(angular, angularAMD, routes) {
	var controller = angular.module('app.controller', ['ngRoute', 'app.factory']);

	controller.config(function($routeProvider) {
		// Load routes
		angular.forEach(routes, function(routeConfigs) {
			angular.forEach(routeConfigs, function(routeConfig) {
				routeConfig = angular.extend({
					controllerAs: 'vm'
				}, routeConfig);
				$routeProvider.when(routeConfig.routeUrl, angularAMD.route(routeConfig));
			});
		});
	});
	
	return controller;
});