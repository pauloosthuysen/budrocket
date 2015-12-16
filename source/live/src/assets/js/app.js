(function(){
	'use strict';
	
	var budRocketApp = angular.module('BudRocketApp', [
	'ngRoute',
	'BudRocketApp.controllers',
	'templates'
	]);
	
	budRocketApp.config(['$routeProvider',
		function($routeProvider){
			$routeProvider
				.when('/home', {
					controller: 'HomeCtrl',
					templateUrl: 'home/template.home.html'
				})
				.when('/login', {
					controller: 'LoginCtrl',
					templateUrl: 'login/template.login.html'
				}).otherwise({
                    redirectTo: '/home'
                });
		}
	]);
}());