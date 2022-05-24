app.factory('authService', ['services', '$rootScope', (services, $rootScope) => {
    let service = { sign_in: register }
    return service;


    function register(username, email, password, rpassword) {
        console.log(username, email, password, rpassword);
    }
}])