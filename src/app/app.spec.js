import app from './app';

describe('app', () => {

	describe('AppCtrl', () => {
		let service, $controller, $rootScope, $http, $httpBackend, createController;

		beforeEach(() => {
			angular.mock.module(app);
			angular.mock.inject(($injector) => {
				service = $injector.get('getData');
				$controller = $injector.get('$controller');
				$rootScope = $injector.get('$rootScope');
				$http = $injector.get('$http');
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.whenGET('https://api.icndb.com/jokes/random/1?escape=javascript').respond(400, {});
				$httpBackend.whenGET('https://api.icndb.com/categories').respond(200, {
					"type": "success",
					"value": ["nerdy", "explicit"]
				});
				createController = () => {
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
		it('Verify service has been called', () => {
			let controller = createController();
			service.req($http, 'https://api.icndb.com/jokes/random/1?escape=javascript').then((data) => {
				expect(data).toEqual({});
			}, () => {
				expect($rootScope.alertDanger).toEqual(true);
			});
			service.req($http, 'https://api.icndb.com/categories').then((data) => {
				expect($rootScope.categories).toEqual(data.value);
			});
			$httpBackend.flush();
		});
	});
});