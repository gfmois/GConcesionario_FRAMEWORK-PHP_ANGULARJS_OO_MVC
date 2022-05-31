app.factory('authService', ['services', '$rootScope', (services, $rootScope) => {
    let service = { 
        rg_checkUserInfo: rg_checkUserInfo,
        lg_checkUserInfo: lg_checkUserInfo,
        verifyUser: verifyUser,
        getUserInfo: getUserInfo
    }
    return service;

    function rg_checkUserInfo(user_inf) {
        let complete = [];
        for (let i = 0; i < Object.keys(user_inf).length; i++) {
            if (Object.keys(user_inf)[i] != "avatar") {
                complete.push(Object.values(user_inf)[i] != null);
            }
        }

       if (!complete.includes(false)) {
            if (user_inf.password === user_inf.ck_passwd) {
                return services.post('auth', 'register', user_inf).then((res) => {
                    return res
                })
            } else {
                return {
                    result: {
                        code: 345,
                        message: "Las contraseñas no coinciden"
                    } 
                }
            }
       } else {
            return {
                result: {
                    code: 346,
                    message: "Por favor, complete todos los campos"
                }
            }
       }
    }

    function lg_checkUserInfo(user_inf) {
        for (let i = 0; i < Object.keys(user_inf).length; i++) {
            if (Object.values(user_inf)[i].length == 0 || Object.values(user_inf)[i] == null) {
                return {
                    result: {
                        code: 346,
                        message: "Por favor, complete todos los campos"
                    }
                }
            }
        }

        return services.post('auth', 'login', user_inf).then((result) => {
            return result;
        })
    }


    function verifyUser(token) {
        return services.post('auth', 'verification', {'token': token}).then((msg) => {
            return msg;
        })
    }

    function getUserInfo() {
        return services.reqHeader('auth', 'checkToken', localStorage.getItem('token').split('"')[1]).then((msg) => {
            return msg;
        })
    }
}])