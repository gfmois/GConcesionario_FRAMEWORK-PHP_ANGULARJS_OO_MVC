let app = angular.module('GConcesionario_FRAMEWORK_ANGULARJS_OO_MVC', ['ngRoute', 'toastr', 'routeStyles']);

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            css: ['frontend/view/css/swiper.css', 'https://unpkg.com/swiper@8/swiper-bundle.min.css'],
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
        .when('/shop', {
            templateUrl: "frontend/module/shop/view/Shop.html",
            css: ['frontend/view/css/filtersDiv.css', 'frontend/view/css/listAll.css', 'frontend/view/css/shopList.css'],
            controller: "shopController",
            resolve: {
                list: (services) => {
                    return services.get('shop', 'allCars');
                },
                filters: (services) => {
                    return services.get('shop', 'cars');
                }
            }
        })
        .when('/auth', {
            templateUrl: "frontend/module/auth/view/AuthForm.html",
            css: "frontend/view/css/LoginForm.css",
            controller: 'authController'
        })
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "contactController",
        })
        .otherwise({
            redirectTo: "/home"
        })
}]);

app.run(($rootScope, searchServices) => {
    $rootScope.viewMenu = false;

    $rootScope.showMenu = () => {
        $rootScope.viewMenu = !$rootScope.viewMenu
    }
})