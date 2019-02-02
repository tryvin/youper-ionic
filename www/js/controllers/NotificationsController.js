ionicApp.controller('NotificationsController', ['$scope', '$ionicHistory', '$ionicLoading', 'Notifications',
function($scope, $ionicHistory, $ionicLoading, Notifications) {
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }

    $scope.queryClass = function(item) {
        return ! item.isRead ? 'has-notifications' : '';
    }

    $scope.pendingNotifications = false;

    $scope.$on('$ionicView.enter', function() {
        $ionicLoading.show({
            template: 'Loading notifications...'
        });

        Notifications.query(function(notificationList) {
            $ionicLoading.hide();
            $scope.pendingNotifications = notificationList;
        });
    });
}])
