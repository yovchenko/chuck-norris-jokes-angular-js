import angular from 'angular';
import '../style/app.css';
import 'bootstrap/dist/css/bootstrap.css';
let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', function($scope, $q, $http, $timeout) {
    $http.get('https://api.icndb.com/jokes/random?escape=javascript')
  .then(function (response) {
    $scope.joke = response.data.value.joke;
},function (error){
    $scope.joke = "Sorry,no jokes today!"
});
$http.get('https://api.icndb.com/categories')
  .then(function (response) {
  $scope.categories= response.data.value;
  },function (error){
  $scope.categories = "Buttons"
});
});
export default MODULE_NAME;