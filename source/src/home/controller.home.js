(function(){
	angular.module('BudRocketApp.controllers').controller('HomeCtrl', ['$scope', '$rootScope', '$http',
		function($scope, $rootScope, $http){
			$rootScope.CurrentPage = 'Home';
			$scope.title = 'Overview';
			$scope.expensesTotal = 0;
			$scope.incomesTotal = 0;
			$scope.cashflowtotal = 0;
			$scope.transactions = [];
			$scope.tags = [];
			
			$scope.init = init;
			$scope.getTagTotal = getTagTotal;
			
			function init(){
				loadTransactions();
				getTags();
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
						
						$scope.transactions.push(response[i]);
					}
				});
			}
			
			function getTags(){
				$http.get('data/tags.json').success(function(response){
					for(var i = 0; i < response.length; i++){
						var tag = response[i];
						
						$scope.tags.push(tag);
					}
				});
			}
			
			function getTagTotal(tagName){
				var retVal = 0;
				
				for(var i = 0; i < $scope.transactions.length; i++){
					if($scope.transactions[i].Tag == tagName){
						retVal += parseFloat($scope.transactions[i].Amount, 2);	
					}
				}
				
				return retVal;
			}
		}
	]);
}());