app.controller('PortfolioChartController', ['$scope', 'Portfolio', '$stateParams', '$window', function($scope, Portfolio,$stateParams,$window){

$scope.data1 = {
		series: ['yo', 'yo1'],
		data: [{
			x: "Cash",
			y: [50],
			//tooltip: "this is tooltip"
		},
		{
			x:'Stocks',
			y:[50],
		}]
	};
	$scope.chartType = 'pie';

	$scope.config1 = {
		labels: true,
		click: function(d) {
			$scope.getBalance();
			Materialize.toast('Assets Updated!', 1000);
		},
		title: "Asset Allocation",
		legend: {
			display: true,
			position: 'right'
		},
		colors: ['#6baed6','#9ecae1'],
		innerRadius: 0
	};


$scope.getBalance = function (){
	var leagueId = $stateParams.leagueId;
	var userId = $window.localStorage.getItem('com.tp.userId');
    Portfolio.getPortfolio(leagueId, userId).then(function(portfolio){
			$scope.balance = portfolio.balance;
			$scope.portfolioValue = portfolio.portfolioValue;
			$scope.total = $scope.balance + $scope.portfolioValue;
			$scope.data1.data[0].y[0]=(Math.round($scope.balance/$scope.total*100));
			$scope.data1.data[1].y[0]=(Math.round($scope.portfolioValue/$scope.total*100));
		});

};
$scope.getBalance();

}]);