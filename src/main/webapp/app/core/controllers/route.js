define(function() {
	return {
		main: [{
			routeUrl: '/login',
			templateUrl: 'views/main/templates/login.html',
			controller: 'LoginController',
			controllerUrl: 'views/main/controllers/login'
		}],
		home: [{
			routeUrl: '/home',
			templateUrl: 'views/home/templates/dashboard.html',
			controller: 'HomeController',
			controllerUrl: 'views/home/controllers/dashboard'
		}],
		mybatis: [{
			routeUrl: '/mybatis/parameter-matcher',
			templateUrl: 'views/mybatis/templates/parameter-matcher.html',
			controller: 'ParameterMatcherController',
			controllerUrl: 'views/mybatis/controllers/parameter-matcher'
		}, {
			routeUrl: '/mybatis/sql-mapper',
			templateUrl: 'views/mybatis/templates/sql-mapper.html',
			controller: 'SQLMapperController',
			controllerUrl: 'views/mybatis/controllers/sql-mapper'
		}]
	};
});