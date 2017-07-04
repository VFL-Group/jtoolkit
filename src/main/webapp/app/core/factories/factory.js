define([
	'angular',
	'angularAMD',
	'core/controllers/dialog',
	'css!css/core/dialog',
	'angular-ngDialog',
	'angular-ngTable',
    'angular-cookies'
], function(angular, angularAMD, dialogs) {
	var factory = angular.module('app.factory', ['ngDialog', 'ngTable', 'ngCookies']);
	
	// ngDialg
	factory.config(function($provide, ngDialogProvider) {
		ngDialogProvider.setDefaults({
			bodyClassName: '',// ngdialog-open
            className: 'ngdialog-theme-default',
            plain: false,
            showClose: true,
            closeByDocument: false,
            closeByEscape: true,
            appendTo: false,
            disableAnimation: true,
            preCloseCallback: function () {
                //console.log('Default pre-close callback');
            }
        });
		
		$provide.factory('Dialog', function($q, ngDialog) {
			var dialogFactory = {};
			var dialogTemplate = [
					'<div class="ngdialog-message">',
					'  <h3 ng-if="type == \'alert\'">Alert</h3>',
					'  <h3 ng-if="type == \'confirm\'">Confirm</h3>',
					'  <div class="message" ng-bind="message"></div>',
					'</div>',
					'<div ng-if="type == \'alert\'" class="ngdialog-buttons">',
					'  <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">OK</button>',
					'</div>',
					'<div ng-if="type == \'confirm\'" class="ngdialog-buttons">',
					'  <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">Cancel</button>',
					'  <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">OK</button>',
					'</div>'
				].join('');
			
			dialogFactory.$alert = function(message) {
				var defer = $q.defer();
				ngDialog.open({
					template: dialogTemplate,
					plain: true,
					controller: function($scope) {
						$scope.type = 'alert';
						$scope.message = message;
					}
				}).closePromise.then(function(data) {
					defer.resolve(data);
				});
				
				return defer.promise;
			};
			
			dialogFactory.$confirm = function(message) {
				var defer = $q.defer();
				ngDialog.openConfirm({
					template: dialogTemplate,
					plain: true,
					controller: function($scope) {
						$scope.type = 'confirm';
						$scope.message = message;
					}
				})
				.then(function(data) {
					defer.resolve(data);
				}, function(data) {
					defer.reject(data);
				});
				
				return defer.promise;
			};
			
			dialogFactory.$dialog = function(options) {
				var defer = $q.defer();
				ngDialog.open(options).closePromise.then(function(data) {
					defer.resolve(data);
				});

				return defer.promise;
			};
			
			// load dialogs
			var popupDialogs = {};
			angular.forEach(dialogs, function(dialogConfigs) {
				angular.forEach(dialogConfigs, function(dialogConfig) {
					popupDialogs[dialogConfig.method] = function(context) {
						var defer = $q.defer();
						var _dialogConfig = angular.extend({
							controllerAs: 'dvm',
							resolve: {
								Context: function() { return context; }
							}
						}, dialogConfig);
						
						ngDialog.open(angularAMD.route(_dialogConfig)).closePromise.then(function(data) {
							var _data = angular.extend({ params: context }, data);
							defer.resolve(_data);
						});
						
						return defer.promise;
					};
				});
			});
			dialogFactory.$open = function() {
				return popupDialogs;
			};
			
			return dialogFactory;
		});
	});

	// ngTable
	factory.factory('Table', function($q, $window, NgTableParams) {
		var tableFactory = {
			$create: function(settings, options) {
				var _settings = settings;
				var _options = angular.extend({
					filterDelay: 200
				}, options);
				
				var dataset = [];
				if (_settings['pageable']) {
					_settings = angular.extend({
						page: 1,
						count: 10,
						total: 0,
						reloaded: false
					}, _settings);
					_options = angular.extend({
				        paginationMinBlocks: 2,
						paginationMaxBlocks: 10,
						counts: [10, 25, 50, 100],
						getData: function(params) {
							if (_settings['reloaded']) {
								_settings['reloaded'] = false;
							} else {
								params['offset'] = (params.page() - 1) * params.count();
								params['limit'] = params.count();
	
								var defer = $q.defer();
								_options['getPageData'](params).then(function(data) {
									if (data == null || data.length == 0) {
										if (params.page() > 1) {
											params.page(params.page() - 1);
											
											options['getPageData'](params).then(function(datax) {
												defer.resolve(datax);
											}, function(datax) {
												defer.reject(datax);
											});
										}
									}
									defer.resolve(data);
								}, function(data) {
									defer.reject(data);
								});
								dataset = defer.promise;
							}
							return dataset;
						}
					}, _options);
				}
				
				return new NgTableParams(_settings, _options);
			}
		};
		
		return tableFactory;
	});
	
	return factory;
});
