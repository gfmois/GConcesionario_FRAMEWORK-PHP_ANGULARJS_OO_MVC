app.controller('authController', ($scope, authService) => {
    $scope.swapMenu = false;
    $scope.sign_in = function() {
        console.log(this);
    }
})