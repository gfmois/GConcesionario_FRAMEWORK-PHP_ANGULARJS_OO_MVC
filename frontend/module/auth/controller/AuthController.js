app.controller('authController', ($scope, $routeParams, $route, authService) => {
    let path = $route.current.originalPath.split('/');
    
    $scope.swapMenu = false;

    if (path[1] == "auth") {
        $scope.verifyView = false;
        $scope.authView = true;
    } else if (path[1] == "verify") {
        $scope.verifyView = true;
        $scope.authView = false;
    }
    
    $scope.checkLogin = function() {
        console.log($scope.username);
    }

    $scope.checkRegister = () => {
        let complete = [];
        let usr_obj = {
            username: $scope.rg_username_inp != undefined ? $scope.rg_username_inp : null,
            email: $scope.rg_email_inp != undefined ? $scope.rg_email_inp : null,
            password: $scope.rg_passwd_inp != undefined ? $scope.rg_passwd_inp : null,
            ck_passwd: $scope.rg_repasswd_inp != undefined ? $scope.rg_repasswd_inp : null,
            avatar: "https://api.multiavatar.com/" +  $scope.rg_username_inp + ".png"
        }

        let user_inf_result = authService.checkUserInfo(usr_obj);

        // NOTE: Pintar el mensaje en el formulario 
        if (typeof user_inf_result.then == "function") {
           user_inf_result.then((data) => {
                console.log(data);
            })
        } else {
            console.log(authService.checkUserInfo(usr_obj));
        }

    }
})