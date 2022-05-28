app.factory('authService', ['services', '$rootScope', (services, $rootScope) => {
    let service = { 
        sign_in: register,
        checkUserInfo: checkUserInfo
    }
    return service;


    function register(user_inf) {
        return services.post('auth', 'register', user_inf).then((res) => {
            return res
        })
    }

    function checkUserInfo(user_inf) {
        let complete = [];
        for (let i = 0; i < Object.keys(user_inf).length; i++) {
            if (Object.keys(user_inf)[i] != "avatar") {
                complete.push(Object.values(user_inf)[i] != null);
            }
        }

       if (!complete.includes(false)) {
            if (user_inf.password === user_inf.ck_passwd) {
                return register(user_inf).then((msg) => {
                    return msg;
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
}])