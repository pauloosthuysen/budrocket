(function(){
	angular.module('BudRocketApp.controllers').controller('TransactionsCtrl', ['$scope', '$rootScope','$http',
		function($scope, $rootScope, $http){
			$rootScope.CurrentPage = 'Transactions';
			$scope.title = 'Transactions';
			
			$scope.transactions = [];
			$scope.transactionsTotal = 0;
			
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
						$scope.transactions.push(response[i]);
						$scope.transactionsTotal += parseFloat(response[i].Amount, 2);
					}
				});
			}
			
			function loadIncomes(){
				$http.get('data/incomes.json').success(function(response){
					for(var i = 0; i < response.length; i++){
						$scope.transactions.push(response[i]);
						$scope.transactionsTotal += parseFloat(response[i].Amount, 2);
					}
				});
			}
		}
	]);
}());