app.factory('searchServices', ['services', '$rootScope', (services, $rootScope) => {
    let service = {
        test: test
    }
    return service;

    function test() {
        console.log("A");
    }
}])