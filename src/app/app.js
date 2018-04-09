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
		getData.req($http, 'https://api.icndb.com/jokes/random/1?escape=javascript').then(function (data) {
			$scope.jokes = data.value;
		}, function () {
			$scope.jokes = 'Oops,something went wrong!';
		});
		getData.req($http, 'https://api.icndb.com/categories').then(function (data) {
			$scope.categories = data.value;
		}, function () {
			$scope.categories = 'Oops,something went wrong!';
		});
		$scope.selectCategory = function (el) {
			let input = ($scope.jokesNumber === undefined || $scope.jokesNumber === '')? 1 : Number($scope.jokesNumber),
				type = (el === undefined)? undefined : el.item;
				$scope.alertWarning = false;
			if (input > 0 && input <= 10) {
				$scope.jokes = '';
				if(type === undefined) {
					getData.req($http, 'https://api.icndb.com/jokes/random/' + input + '?&escape=javascript').then(function (data) {
						$scope.jokes = data.value;
					}, function () {
						$scope.jokes = 'Oops,something went wrong!';
					});
				}
				else {
					getData.req($http, 'https://api.icndb.com/jokes/random/' + input + '?limitTo=[' + type + ']&escape=javascript').then(function (data) {
						$scope.jokes = data.value;
					}, function () {
						$scope.jokes = 'Oops,something went wrong!';
					});
				}
			} else $scope.alertWarning = true;
		};
		$scope.change = function () {
			$scope.selectCategory();
		};
		$scope.reset = function () {
			$scope.selectCategory();
		};
		$scope.alertWarning = false;
	}]);
export default MODULE_NAME;