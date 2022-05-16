let app = angular.module('GConcesionario_FRAMEWORK_ANGULARJS_OO_MVC', ['ngRoute', 'toastr']);

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            controller: "homeController",
            resolve: {
                carousel: (services) => {
                    return services.get('home', 'carousel');
                },
                category: (services) => {
                    return services.get('home', 'category');
                },
                type: (services) => {
                    return services.get('home', 'types');
                }
            }
        })
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "contactController",
        })
}]);