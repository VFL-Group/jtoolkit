define([
	'angular',
	'clipboard'
], function(angular, Clipboard) {
	window['Clipboard'] = Clipboard;
	
	var directive = angular.module('app.directive', []);
	
	directive.config(function() {
		
	});
	
	return directive;
});