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
            css: ['frontend/view/css/filtersDiv.css', 'frontend/view/css/listAll.css', 'frontend/view/css/shopList.css', 'frontend/view/css/likeBtn.css', 'frontend/view/css/pagination.css'],
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
        .when('/details/:id', {
            templateUrl: "frontend/module/shop/view/Shop.html",
            css: ['frontend/view/css/details.css', 'frontend/view/css/thumbCarousel.css', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css', 'frontend/view/css/buttons.css'],
            controller: "shopController",
            resolve: {
                list:() => {},
                filters: () => {}
            }
        })
        .when('/auth', {
            templateUrl: "frontend/module/auth/view/AuthForm.html",
            css: "frontend/view/css/LoginForm.css",
            controller: 'authController'
        })
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            css: "frontend/view/css/contact.css",
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