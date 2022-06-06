app.controller('authController', ($scope, $rootScope, $routeParams, $route, authService) => {

    if ($rootScope.usrSetting == true) {
        location.href = "#/home";
    } else {
        $rootScope.usr_info = null;
    }

    let path = $route.current.originalPath.split('/');
    
    $scope.swapMenu = false;
    $scope.rg_error = false;

    if (path[1] == "auth") {
        $scope.verifyView = false;
        $scope.authView = true;
    } else if (path[1] == "verify") {
        $scope.verifyView = true;
        $scope.authView = false;

        authService.verifyUser($routeParams.id).then((res) => {
            if (res.result.code != 823) {
                Swal.fire({
                    title: 'Ups...',
                    text: res.result.message,
                    icon: 'error',
                    confirmButtonText: 'Está bien, llevame al inicio.',
                }).then(okay => {
                    if (okay) {
                        location.reload()
                   }})
            }
        })
    }

    $scope.checkRegister = () => {
        let usr_obj = {
            username: $scope.rg_username_inp != undefined ? $scope.rg_username_inp : null,
            email: $scope.rg_email_inp != undefined ? $scope.rg_email_inp : null,
            password: $scope.rg_passwd_inp != undefined ? $scope.rg_passwd_inp : null,
            ck_passwd: $scope.rg_repasswd_inp != undefined ? $scope.rg_repasswd_inp : null,
            avatar: "https://api.multiavatar.com/" +  $scope.rg_username_inp + ".png"
        }

        let user_inf_result = authService.rg_checkUserInfo(usr_obj);

        if (typeof user_inf_result.then == "function") {
           user_inf_result.then((data) => {
                if (data.result.code == 23) {
                    Swal.fire({
                        title: 'Todo fue bien',
                        text: data.result.message + ", revise su correo para verificar la cuenta.",
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    })
                } else if (data.result.code == 4 || data.result.code == 345) {
                    $scope.rg_error = true;
                    $scope.rg_error_msg = data.result.message;
                } else {
                    Swal.fire({
                        title: 'Ups...',
                        text: "Lo sentimos, algo salió mal. Intentelo más tarde.",
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    })
                }
            })
        } else {
            $scope.rg_error = true;
            $scope.rg_error_msg = user_inf_result.result.message;
        }
    }

    $scope.checkLogin = () => {
        let lg_obj = {
            username: $scope.lg_username_inp != undefined ? $scope.lg_username_inp : null,
            password: $scope.lg_passwd_inp != undefined ? $scope.lg_passwd_inp : null
        }

        let lg_result = authService.lg_checkUserInfo(lg_obj);

        if (typeof lg_result.then == "function") {
            lg_result.then((msg) => {
                if (typeof msg.result == "object") {
                    $scope.lg_error = true;
                    $scope.lg_error_msg = msg.result.message;
                } else {
                    localStorage.setItem('token', msg);
                    $scope.usr_status = true;
                    location.reload()
                    location.href = "#/home";
                }
            })
        } else {
            $scope.lg_error = true;
            $scope.lg_error_msg = lg_result;
        }
    }

    $scope.goLogin = () => {
        $scope.authView = true;
        $scope.verifyView = false;

        location.href = '#/auth';
    }

    $scope.s_gh_login = () => {
        $rootScope.lg_opt = 'github';
        authService.login()
    }
    
    $scope.s_gm_login = () => {
        $rootScope.lg_opt = 'google-oauth2';
        authService.login()
    }

})