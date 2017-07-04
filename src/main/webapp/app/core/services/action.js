define(function() {
	return {
		main: [{
			baseUrl: '/auth',
			service: 'AuthService',
			methods: {
				login: '/login',
				logout: '/logout',
				regist: '/regist',
				reset: '/reset'
			}
		}, {
			baseUrl: '/user',
			service: 'UserService',
			methods: {
				savePassword: '/savePassword'
			}
		}],
		clothing: [{
			baseUrl: '/category',
			service: 'CategoryService',
			methods: {
				saveCategory: '/saveCategory',
				getCategory: '/getCategory',
				getCategoryByPage: '/getCategoryByPage',
				removeCategory: '/removeCategory'
			}
		}, {
			baseUrl: '/clothing',
			service: 'ClothingService',
			methods: {
				saveClothing: '/saveClothing',
				getClothing: '/getClothing',
				getClothingByPage: '/getClothingByPage',
				removeClothing: '/removeClothing'
			}
		}]
	};
});