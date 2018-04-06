import angular from 'angular';
import '../style/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
let app = () => {
	return {
		template: require('./app.html'),
		controller: 'AppCtrl',
		controllerAs: 'app'
	};
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
	.directive('app', app)
	.service('getData', function () {
		this.req = function ($http, url) {
			return $http.get(url)
				.then(function (response) {
					return response.data;
				});
		};
	})
	.controller('AppCtrl', function ($scope, $http, getData) {
		getData.req($http, 'http://api.icndb.com/jokes/random?escape=javascript').then(function (data) {
			$scope.joke = data.value.joke;
		}, function () {
			$scope.joke = 'Oops,something went wrong!';
		});
		getData.req($http, 'https://api.icndb.com/categories').then(function (data) {
			$scope.categories = data.value;
		}, function () {
			$scope.categories = 'Oops,something went wrong!';
		});
		$scope.selectCategory = function(el) {
		// buttons	console.log(el.item);
		};
		$scope.change = function() {
			// input    console.log($scope.jokesNumber)
		};
	});
export default MODULE_NAME;