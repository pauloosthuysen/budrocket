(function(){
	angular.module('BudRocketApp.controllers').controller('TransactionsCtrl', ['$scope', '$rootScope','$http',
		function($scope, $rootScope, $http){
			$rootScope.CurrentPage = 'Transactions';
			$scope.title = 'Transactions';
			
			$scope.init = init;
			
			function init(){
				
			}
		}
	]);
}());