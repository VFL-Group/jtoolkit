define([
    'angular',
    'angular-ui-bootstrap',
    'core/controllers/controller',
    'core/directives/directive',
    'core/factories/factory',
    'core/filters/filter',
    'core/providers/provider',
    'core/services/service'
], function(angular) {
	return angular.module('app.main', [
		'ui.bootstrap',
        'app.controller',
        'app.directive',
        'app.factory',
        'app.filter',
        'app.provider',
        'app.service'
	]);
});