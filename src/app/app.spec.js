import app from './app';

describe('app', () => {

	describe('AppCtrl', () => {
		var $controller, $rootScope, $http, createController, getData;

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
			$rootScope.jokesNumber = 11;
			$rootScope.selectCategory();
			expect($rootScope.alertWarning).toEqual(true);
		});
	});
});