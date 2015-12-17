(function(){
	angular.module('BudRocketApp.controllers').controller('HomeCtrl', ['$scope', '$rootScope', '$http',
		function($scope, $rootScope, $http){
			$rootScope.CurrentPage = 'Home';
			$scope.title = 'Home';
			$scope.expenses = [];
			$scope.incomes = [];
			$scope.expensesTotal = 0;
			$scope.incomesTotal = 0;
			
			$scope.init = init;
			$scope.loadExpenses = loadExpenses;
			$scope.loadIncomes = loadIncomes;
			
			function init(){
				loadExpenses();
				loadIncomes();
			}
			
			function loadExpenses(){
				$http.get('data/expenses.json').success(function(response){
					$scope.expenses = response;
					
					for(var i = 0; i < response.length; i++){
						$scope.expensesTotal += parseFloat(response[i].Amount, 2);
					}
				});
			}
			
			function loadIncomes(){
				$http.get('data/incomes.json').success(function(response){
					$scope.incomes = response;
					
					for(var i = 0; i < response.length; i++){
						$scope.incomesTotal += parseFloat(response[i].Amount, 2);
					} 
				});
			}
		}
	]);
}());