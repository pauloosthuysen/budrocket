(function(){
	angular.module('BudRocketApp.controllers').controller('HomeCtrl', ['$scope', '$rootScope', '$http',
		function($scope, $rootScope, $http){
			$rootScope.CurrentPage = 'Home';
			$scope.title = 'Home';
			$scope.expensesTotal = 0;
			$scope.incomesTotal = 0;
			$scope.cashflowtotal = 0;
			
			$scope.init = init;
			$scope.loadExpenses = loadExpenses;
			$scope.loadIncomes = loadIncomes;
			
			function init(){
				loadExpenses();
				loadIncomes();
			}
			
			function loadExpenses(){
				$http.get('data/expenses.json').success(function(response){
					for(var i = 0; i < response.length; i++){
						response[i].Amount = response[i].Amount * -1;
						$scope.expensesTotal += parseFloat(response[i].Amount, 2);
						$scope.cashflowtotal += parseFloat(response[i].Amount, 2);;
					}
				});
			}
			
			function loadIncomes(){
				$http.get('data/incomes.json').success(function(response){
					for(var i = 0; i < response.length; i++){
						$scope.incomesTotal += parseFloat(response[i].Amount, 2);
						$scope.cashflowtotal += parseFloat(response[i].Amount, 2);;
					} 
				});
			}
		}
	]);
}());