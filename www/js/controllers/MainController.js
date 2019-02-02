ionicApp.controller('MainController', ['$scope', '$ionicLoading', 'User', 'CameraFactory', function($scope, $ionicLoading, User, CameraFactory) {
    $scope.hasPendingNotification = false;
    $scope.userInformation = {
        id: 0,
        picture: false
    }

    $scope.openCamera = function() {
        var options = {
            quality : 75,
            targetWidth: 200,
            targetHeight: 200,
            sourceType: 0,
            destinationType : Camera.DestinationType.FILE_URI
        };

        CameraFactory.getPicture(options).then(function(imageData) {
            $ionicLoading.show({
                template: 'Uploading photo...'
            });

            CameraFactory.uploadPicture(imageData).then(function(responseCode) {
                User.me(function(userInformation) {
                    $ionicLoading.hide();
                    $scope.userInformation = userInformation;
                    $scope.hasPendingNotification = userInformation.hasPendingNotification;
                });

            }, function(errorCode) {
                $ionicLoading.hide();
                alert('Error - ' + errorCode);
            })
        }, function(errorCode) {
            alert('Error 1 - ' + errorCode);
        });
    }

    $scope.$on('$ionicView.enter', function() {
        $ionicLoading.show({
            template: 'Loading notifications...'
        });

        User.me(function(userInformation) {
            $ionicLoading.hide();

            $scope.userInformation = userInformation;
            $scope.hasPendingNotification = userInformation.hasPendingNotification;
        });
    });
}])
