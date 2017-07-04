define(['app'], function(app) {
	app.controller('PasswordEditController', function Controller($scope, Dialog, Context, UserService) {
		var that = this;
		
		that.password = '';
		that.newPassword = '';
		that.confirmPassword = '';
    	
    	that.init = function() {
			// init
		};
		
    	$scope.save = function(valid) {
    		if (valid) {
    			if (that.newPassword != that.confirmPassword) {
    				return;
    			}
    			UserService.savePassword({
    				password: that.password,
    				newPassword: that.newPassword
    			}).then(function(resp) {
    				if (resp.data.success) {
            			Context.success = true;
                		Dialog.$alert('密码修改成功！').then(function() {
                			$scope.closeThisDialog();
                		});	
    				}
    			});	
    		}
    	};
    });
});