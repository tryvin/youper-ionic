ionicApp.factory('CameraFactory', function($q) {
    return {
        getPicture: function(options) {
            var q = $q.defer();

            navigator.camera.getPicture(function(result) {
                q.resolve(result);
            }, function(err) {
                q.reject(err);
            }, options);

            return q.promise;
        },
        uploadPicture: function(pictureUrl) {
            return new Promise(function (resolve, reject) {
                var success = function (r) {
                    resolve(r.responseCode);
                }

                var fail = function (error) {
                    reject(error.code);
                }

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = pictureUrl.substr(pictureUrl.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";

                var ft = new FileTransfer();
                ft.upload(pictureUrl, encodeURI(SERVER_URL + '/user/upload-picture'), success, fail, options);
            })
        }
    }
});
