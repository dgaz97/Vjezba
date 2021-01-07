angular.module('core.images')
    .factory('MovieImages', ['$resource', function ($resource) {
        return $resource('https://localhost:44385/image/getall/:type/:id', {}, {
            movieImages: {
                method: 'GET',
                params: {
                    type: '@type',
                    id: '@id'
                },
                isArray: true
            }
        })
    }]
    )
    .factory('DeleteImage', ['$resource', function ($resource) {
        return $resource('https://localhost:44385/upload/remove/:type/:id', {}, {
            deleteImage: {
                method: 'POST',
                params: {
                    type: '@type',
                    id: '@id'
                },
                headers:{'content-type':'application/x-www-form-urlencoded'}
            }
        })
    }]
    );