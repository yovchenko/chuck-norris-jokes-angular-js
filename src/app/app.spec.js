import app from './app';

describe('app', () => {

	describe('AppCtrl', () => {
		let $controller, $rootScope, createController;

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

		it('Matching a randomly generated String to input', () => {
			let controller = createController(),
				x = 100;

			function randomStr(num) {
				let str = '',
					abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&**()_+~:"|?><';
				for (let y = 0; y < num; y++) {
					str += abc.charAt(Math.floor(Math.random() * abc.length));
				}
				return str;
			}
			while (x--) {
				let randomNum = Math.floor((Math.random() * x) + 1);
				$rootScope.jokesNumber = randomStr(randomNum);
				$rootScope.selectCategory();
				expect($rootScope.alertWarning).toEqual(true);
			}
		});
	});
});