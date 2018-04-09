import angular from 'angular';
import '../style/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/angular-animate/angular-animate.min.js';

let app = () => {
	return {
		template: require('./app.html'),
		controller: 'AppCtrl',
		controllerAs: 'app'
	};
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngAnimate'])
	.directive('app', app)
	.service('getData', function () {
		this.req = function ($http, url) {
			return $http.get(url)
				.then(function (response) {
					return response.data;
				});
		};
	})
	.controller('AppCtrl',['$scope','$http','getData',function ($scope, $http, getData) {
		$scope.alertDanger = false;
		$scope.alertWarning = false;
		getData.req($http, 'https://api.icndb.com/jokes/random/1?escape=javascript').then(function (data) {
			$scope.jokes = data.value;
		}, function () {
			$scope.alertDanger = true;
		});
		getData.req($http, 'https://api.icndb.com/categories').then(function (data) {
			$scope.categories = data.value;
		});
		$scope.selectCategory = function (el) {
			let input = ($scope.jokesNumber === undefined || $scope.jokesNumber === '')? 1 : Number($scope.jokesNumber),
				type = (el === undefined)? undefined : el.item;
			$scope.alertWarning = false;
			if (input > 0 && input <= 10) {
				if(type === undefined) {
					getData.req($http, 'https://api.icndb.com/jokes/random/' + input + '?&escape=javascript').then(function (data) {
						$scope.jokes = data.value;
						$scope.alertDanger = false;
					}, function () {
						$scope.alertDanger = true;
					});
				}
				else {
					getData.req($http, 'https://api.icndb.com/jokes/random/' + input + '?limitTo=[' + type + ']&escape=javascript').then(function (data) {
						$scope.jokes = data.value;
						$scope.alertDanger = false;
					}, function () {
						$scope.alertDanger = true;
					});
				}
			} else $scope.alertWarning = true;
		};
		$scope.change = function () {
			$scope.selectCategory();
		};
		$scope.refresh = function () {
			$scope.selectCategory();
		};
	}]);
export default MODULE_NAME;