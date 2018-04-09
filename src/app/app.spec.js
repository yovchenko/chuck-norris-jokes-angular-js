import app from './app';

describe('app', () => {

	describe('AppCtrl', () => {
		var $controller;

		beforeEach(() => {
			angular.mock.module(app);

			angular.mock.inject((_$controller_) => {
				$controller = _$controller_;
			});
		});

		it('should', () => {
			var $scope = {};
			var controller = $controller('AppCtrl', { $scope: $scope });
			expect($scope.alertWarning).toEqual(false);
		});
  });
  
});