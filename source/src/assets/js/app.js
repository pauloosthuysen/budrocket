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
				}).when('/login', {
					controller: 'LoginCtrl',
					templateUrl: 'login/template.login.html'
				}).when('/transactions', {
					controller: 'TransactionsCtrl',
					templateUrl: 'transactions/template.transactions.html'
				}).when('/categories', {
					controller: 'CategoriesCtrl',
					templateUrl: 'categories/template.categories.html'
				}).otherwise({
                    redirectTo: '/home'
                });
		}
	]);
}());