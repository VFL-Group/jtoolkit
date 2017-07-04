define(['app'], function(app) {
	app.controller('ParameterMatcherController', function Controller() {
		var that = this;
		that.preparedSql = '';
		that.parameters = '';
		that.matchedSql = '';
		
		var QUOTS = ['String', 'Date', 'Timestamp'];
		
		that.init = function() {
			new Clipboard('#copy');
		};
		
		that.clearAll = function() {
			that.preparedSql = '';
			that.parameters = '';
			that.matchedSql = '';
		};
		
		that.matchParameters = function(valid) {
			if (valid) {
				var parameters = [];
				angular.forEach(that.parameters.split(','), function(parameter) {
					parameter = parameter.trim();
					var value = parameter.replace(/\(.*\)/, '');
					var type = parameter.replace(/\(|\)/g, '').substring(value.length);
					if (QUOTS.indexOf(type) >= 0) {
						value = '\'' + value + '\'';
					}
					parameters.push(value);
				});
				
				var index = 0;
				that.matchedSql = that.preparedSql.replace(/\?/g, function() {
					return parameters[index++];
				});
			}
		};
	});
});