app.controller('contactController', ($scope, contactServices) => {
    $scope.sendContactMessage = () => {
        contactServices.sendContactMessage($scope.name, $scope.email, $scope.theme, $scope.textMessage);
    }
});