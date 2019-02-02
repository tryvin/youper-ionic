ionicApp.factory('User', ['$resource', function($resource) {
    return $resource(SERVER_URL + '/user/:id', {id: '@id'}, {
        uploadPicture: {
            method: 'POST',
            url: SERVER_URL + '/user/upload-picture'
        },
        me: {
            method: 'GET',
            url: SERVER_URL + '/user/me'
        }
    });
}]);
