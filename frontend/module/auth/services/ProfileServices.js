app.factory('profileServices', ['services', '$rootScope', (services, $rootScope) => {
    let service = {
        check_passwd: check_passwd,
    }
    return service;

    function check_passwd(usr_obj) {
        return services.reqHeader('auth', 'change_passwd', localStorage.getItem('token').split('"')[1], usr_obj).then((res) => {
            return res
        })
    }
}])