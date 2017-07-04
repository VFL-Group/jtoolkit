define(function() {
	return {
		main: [{
			method: 'editPassword',
			appendClassName: 'ngdialog-width-500 ngdialog-padding-70',
			templateUrl: 'views/dialogs/templates/edit-password.html',
			controller: 'PasswordEditController',
			controllerUrl: 'views/dialogs/controllers/edit-password'
		}]
	};
});