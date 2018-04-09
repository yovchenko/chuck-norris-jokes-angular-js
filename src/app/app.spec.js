import app from './app';

describe('app', () => {

	describe('AppCtrl', () => {
		var $controller, $rootScope, createController;

		beforeEach(() => {
			angular.mock.module(app);
			angular.mock.inject(($injector) => {
				$controller = $injector.get('$controller');
				$rootScope = $injector.get('$rootScope');
				createController = function () {
					return $controller('AppCtrl', {
						'$scope': $rootScope,
					});
				};
			});
		});

		it('should return expexctations', () => {
			var controller = createController();
			function randomStr(m) {
				var s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&**()_+~:"|?><';
				for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
				return s;
			}
			$rootScope.jokesNumber = randomStr(1);
			$rootScope.selectCategory();
			expect($rootScope.alertWarning).toEqual(true);
		});
	});
});