ionicApp.controller('ViewNotificationController',
['$scope', '$ionicHistory', '$ionicLoading', '$stateParams', 'Notifications',
function($scope, $ionicHistory, $ionicLoading, $stateParams, Notifications) {
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }

    $scope.backHome = function() {
        $ionicHistory.goBack(-2);
    }

    $scope.notificationData = false;

    $scope.$on('$ionicView.enter', function() {
        $ionicLoading.show({
            template: 'Loading notification data...'
        });

        Notifications.get({id: $stateParams.notificationId}, function(notificationData) {
            $ionicLoading.hide();
            $scope.notificationData = notificationData;
        });
    });
}])
