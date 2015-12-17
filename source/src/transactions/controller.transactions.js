(function(){
	angular.module('BudRocketApp.controllers').controller('TransactionsCtrl', ['$scope', '$rootScope','$http',
		function($scope, $rootScope, $http){
			$rootScope.CurrentPage = 'Transactions';
			$scope.title = 'Transactions';
			
			$scope.transactions = [];
			$scope.expensesTotal = 0;
			$scope.incomesTotal = 0;
			$scope.cashflowtotal = 0;
			
			$scope.init = init;
			
			function init(){
				loadTransactions();
			}
			
			function loadTransactions(){
				$http.get('data/transactions.json').success(function(response){
					for(var i = 0; i < response.length; i++){
						var type = response[i].Type;
						
						if(type === "Income"){
							$scope.incomesTotal += parseFloat(response[i].Amount, 2);
						}
						
						if(type === "Expense"){
							response[i].Amount = response[i].Amount * -1;
							$scope.expensesTotal += parseFloat(response[i].Amount, 2);
						}
						
						$scope.cashflowtotal += parseFloat(response[i].Amount, 2);
					}
					
					$scope.transactions = response;
				});
			}
		}
	]);
}());