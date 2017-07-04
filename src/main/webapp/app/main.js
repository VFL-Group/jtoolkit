(function() {
	'use strict';
	
	var css = {
		'angular-ngDialog': 'css!lib/angular-ngDialog/css/ngDialog',
		'angular-ngDialog-theme': 'css!lib/angular-ngDialog/css/ngDialog-theme-default',
		'angular-ngTable': 'css!lib/angular-ngTable/css/ng-table'
	};
	
	require.config({
		baseUrl: '',
		map: {
			'*': { 'css': 'css' }
		},
		stickCss: 'main-css-fixed',
		paths: {
			'jquery': 'lib/jquery/jquery.slim',
			'clipboard': 'lib/clipboard/clipboard',
			'bootstrap': 'lib/bootstrap/js/bootstrap',
			'angular': 'lib/angular/angular',
			'angularAMD': 'lib/angularAMD/angularAMD',
			'angular-ui-bootstrap': 'lib/angular-ui-bootstrap/ui-bootstrap-tpls',
			'angular-route': 'lib/angular/angular-route',
			'angular-cookies': 'lib/angular/angular-cookies',
			'angular-ngDialog': 'lib/angular-ngDialog/js/ngDialog',
			'angular-ngTable': 'lib/angular-ngTable/js/ng-table'
		},
		waitSeconds: 0,
		shim: {
			'bootstrap': ['jquery'],
			'angular': { deps: ['jquery'], exports: 'angular' },
			'angularAMD': ['angular'],
			'angular-ui-bootstrap': ['angular', 'bootstrap'],
			'angular-route': ['angular'],
			'angular-cookies': ['angular'],
			'angular-ngDialog': ['angular', css['angular-ngDialog'], css['angular-ngDialog-theme']],
			'angular-ngTable': ['angular', css['angular-ngTable']],
			'app': ['angular', 'bootstrap']
		},
		deps: ['app']
	});
})();
