define([
    'angular',
    'angularAMD',
    'core/init'
], function (angular, angularAMD) {
	var mainApp = angular.module('app', ['app.main']);
	
	mainApp.config(function($httpProvider, $routeProvider) {
		// http
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		// interceptor
		$httpProvider.interceptors.push(function($timeout, $interval, $rootScope, $injector) {
			var isLoaded = false;
			return {
				request: function(request) {
					$rootScope.loadings++;
					// load loading
					if (!isLoaded) {
						isLoaded = true;
						$timeout(function() {
							$rootScope.loading = $rootScope.loadings > 0;
						}, 1000).then(function() {
							var promise = $interval(function() {
								if ($rootScope.loadings == 0) {
									$rootScope.loading = false;
									isLoaded = false;
									$interval.cancel(promise);
								}
							}, 200);
						});
					}

					return request;
				},
				requestError: function(rejection) {
					$rootScope.loadings--;
					return rejection;
				},
				response: function(response) {
					$rootScope.loadings--;
					return response;
				},
				responseError: function(rejection) {
					$rootScope.loadings--;
					if (rejection.status == -1) {
						$injector.get('Dialog').$alert('Connection to server is timeout');
					} else if (rejection.status == 500) {
						// error
						$injector.get('Dialog').$alert(rejection.data.message);
					} else if (rejection.status == 503) {
						// unavailable
						$injector.get('Dialog').$alert('Service connection is disconnected');
					}
					return rejection;
				}
			};
		});
		
		// set default route
		$routeProvider.otherwise({ redirectTo: '/home' });
	});
	
	// add main controller
	angular.element(document).ready(function() {
		angular.element(document.body).attr('ng-controller', 'AppController');
	});
	mainApp.controller('AppController', function($rootScope, $location) {
		$rootScope.loading = false;
		$rootScope.loadings = 0;
		
		$rootScope.initNavbar = function() {
			angular.element('.navbar-nav > li').each(function() {
				angular.element(this).click(function() {
					angular.element('.navbar-nav > li').removeClass('active');
					angular.element(this).addClass('active');
				});
			});
		};
		
		$rootScope.initSidebar = function() {
			angular.element('.bs-docs-sidenav > li').removeClass('active');
			angular.element('.bs-docs-sidenav > li > a').each(function() {
				var $this = angular.element(this);
				if ($this.attr('href').replace(/^#/, '') == $location.path()) {
					$this.parent().addClass('active');
				}
			});
		};
	});
	
    return angularAMD.bootstrap(mainApp);	
});
