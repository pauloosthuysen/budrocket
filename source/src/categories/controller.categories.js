(function(){
	angular.module('BudRocketApp.controllers').controller('CategoriesCtrl', ['$scope', '$rootScope','$http',
		function($scope, $rootScope, $http){
			$rootScope.CurrentPage = 'Categories';
			$scope.title = 'Tags';
			
			$scope.init = init;
			
			function init(){
				
			}
		}
	]);
}());