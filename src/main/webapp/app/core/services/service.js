define([
    'angular',
    'core/services/action'
], function(angular, actions) {
	var service = angular.module('app.service', []);
	
	service.provider('ActionProvider', function($provide) {
		this.$get = function() {
			return {
				register: function(action) {
					function Service($q, $http) {
						this.$q = $q;
						this.$http = $http;
					}
					angular.forEach(action.methods, function(methodUrl, methodName) {
						Service.prototype[methodName] = function(args, options) {
							var defer = this.$q.defer();
							this.$http.post(action.baseUrl + methodUrl, args, options)
							.then(function(response) {
								defer.resolve(response);
							}, function(response) {
								defer.reject(response);
							});
							
							return defer.promise;
						};
					});
					
					$provide.service(action.service, Service);
				}
			};
		};
	});
	
	service.run(function(ActionProvider) {
		// Load actions
		angular.forEach(actions, function(actionConfigs) {
			angular.forEach(actionConfigs, function(actionConfig) {
				ActionProvider.register(actionConfig);
			});
		});
	});
	
	return service;
});