app.factory('authService', ['services', '$rootScope', 'angularAuth0', (services, $rootScope, angularAuth0) => {
    let service = { 
        rg_checkUserInfo: rg_checkUserInfo,
        lg_checkUserInfo: lg_checkUserInfo,
        verifyUser: verifyUser,
        getUserInfo: getUserInfo,
        logout: logout,
        login: login,
        getID_Token: getID_Token,
        getAccessToken: getAccessToken,
        handleAuthentication: handleAuthentication,
        recoverPassword: recoverPassword,
        changePsw_recover: changePsw_recover
    }
    return service;

    function rg_checkUserInfo(user_inf) {
        let complete = [];
        for (let i = 0; i < Object.keys(user_inf).length; i++) {
            if (Object.keys(user_inf)[i] != "avatar" && Object.keys(user_inf)[i] != "password" && Object.keys(user_inf)[i] != "ck_passwd") {
                complete.push(Object.values(user_inf)[i] != null);
            }
        }

       if (!complete.includes(false)) {
            if (user_inf.password === user_inf.ck_passwd) {
                return services.post('auth', 'register', user_inf).then((res) => {
                    console.log(res);
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
            console.log(result);
            return result;
        })
    }


    function verifyUser(token) {
        return services.post('auth', 'verification', {'token': token}).then((msg) => {
            return msg;
        })
    }

    function recoverPassword(email) {
        services.post('auth', 'recover', {'email': email}).then((msg) => {
            if (msg.result.code != 823) {
                Swal.fire({
                    title: 'Ups...',
                    text: msg.result.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                })
            } else {
                Swal.fire({
                    title: 'Todo fue bien',
                    text: msg.result.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = '#/auth';
                    }
                })
            }
        })
    }

    function changePsw_recover(token_email, user_inf) {
         console.log(user_inf);
        for (let i = 0; i < Object.keys(user_inf).length; i++) {
            if (Object.values(user_inf)[i]?.length < 8 || Object.values(user_inf)[i]?.length > 32) {
                $rootScope.recover_error = true;
                $rootScope.recover_error_msg = "La contraseña debe tener entre 8 y 32 caracteres.";
                return;
            } else if (Object.values(user_inf)[i] == null || Object.values(user_inf)[i] == undefined) {
                $rootScope.recover_error = true;
                $rootScope.recover_error_msg = "Por favor, ingrese una contraseña.";
                return;
            } else if (user_inf.passwd != user_inf.repasswd) {
                $rootScope.recover_error = true;
                $rootScope.recover_error_msg = "Las contraseñas no coinciden.";
                return;
            }
        }

        $rootScope.recover_error = false;
        $rootScope.recover_error_msg = "";
        console.log('A');
        services.post('auth', 'recover_passwd', {'token_email': token_email, 'password': user_inf.passwd}).then((msg) => {
            Swal.fire({
                title: 'Todo fue bien',
                text: msg.result.message,
                icon: 'success',
                confirmButtonText: 'Aceptar',
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = '#/auth';
                }
            })
        })

    }


    function getUserInfo() {
        return services.reqHeader('auth', 'checkToken', localStorage.getItem('token').split('"')[1]).then((msg) => {
            return msg;
        })
    }
    
    function getID_Token() {
        return ID_token;
    }

    function getAccessToken() {
        return accessToken;
    }
  
    function login() {
        angularAuth0.authorize({
            connection: $rootScope.lg_opt
        });
    }

    function handleAuthentication() {
        return new Promise((resolve, reject) => {
            angularAuth0.parseHash((err, authResult) => {
              if (authResult && authResult.accessToken && authResult.idToken) {
                  resolve(authResult);
              } else if (err) {
                    throw new Error(`Error: ${err.error}. Check the console for further details.`);
              }
            });
        })
    }

    function logout() {
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('token');
        // Remove tokens and expiry time
        accessToken = '';
        idToken = '';
        expiresAt = 0;
  
        angularAuth0.logout({
          returnTo: '#/home'
        });
  
      }
    

}])