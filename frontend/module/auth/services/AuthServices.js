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
        handleAuthentication: handleAuthentication
    }
    return service;

    function rg_checkUserInfo(user_inf) {
        console.log(user_inf);
        let complete = [];
        for (let i = 0; i < Object.keys(user_inf).length; i++) {
            if (Object.keys(user_inf)[i] != "avatar" && Object.keys(user_inf)[i] != "password" && Object.keys(user_inf)[i] != "ck_passwd") {
                complete.push(Object.values(user_inf)[i] != null);
            }
        }

       if (!complete.includes(false)) {
           console.log();
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

    // FIXME: Acabar si no existe crear usuario
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
          returnTo: window.location.origin
        });
  
      }
    

}])