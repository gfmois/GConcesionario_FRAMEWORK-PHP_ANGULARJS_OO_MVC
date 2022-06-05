app.controller('profileController', ($scope, $rootScope, $routeParams, $route, profileServices) => {
    $scope.control_passwd = function() {
        let obj = {
            actual: $scope.actual_passwd,
            new: $scope.new_passwd,
            ck_new: $scope.new_passwd == $scope.ck_passwd ? true : false
        }

        // FIXME: Acabar y poder cambiar la contraseña.
       if ($scope.new_passwd == $scope.ck_passwd && $scope.new_passwd != $scope.actual_passwd) {
           profileServices.check_passwd(obj).then((msg) => {
               console.log(msg);
               if (msg.result.code == 823) {
                    Swal.fire({
                        title: 'Enhorabuena!',
                        text: msg.result.message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    })
               } else {
                    Swal.fire({
                        title: 'Ups...',
                        text: msg.result.message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    }) 
               }
           })
       } else {
            Swal.fire({
                title: 'Ups...',
                text: "No puedes poner la misma contraseña que la actual.",
                icon: 'error',
                confirmButtonText: 'Aceptar',
            }) 
       }
    }
})