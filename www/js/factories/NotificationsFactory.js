ionicApp.factory('Notifications', ['$resource', function($resource) {
    return $resource(SERVER_URL + '/user/notifications/:id', {id: '@id'});
}]);
