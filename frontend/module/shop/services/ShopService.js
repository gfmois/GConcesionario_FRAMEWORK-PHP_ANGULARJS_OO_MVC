app.factory('shopServices', ['services', '$rootScope', (services, $rootScope) => {
    let service = { addLike: addLike };
    return service;

    function addLike() {
        services.reqHeader('shop', 'likes', localStorage.getItem('token')).then((data) => {
            console.log(data);
        })
    }
}])