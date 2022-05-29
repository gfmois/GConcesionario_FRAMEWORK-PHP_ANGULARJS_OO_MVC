let app = angular.module('GConcesionario_FRAMEWORK_ANGULARJS_OO_MVC', ['ngRoute', 'toastr', 'routeStyles', 'angular-loading-bar']);

app.config(['$routeProvider', 'cfpLoadingBarProvider', ($routeProvider, cfpLoadingBarProvider) => {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html",
            css: ['frontend/view/css/swiper.css', 'https://unpkg.com/swiper@8/swiper-bundle.min.css', 'frontend/view/css/home.css'],
            controller: "homeController",
            resolve: {
                carousel: async (services) => {
                    return await services.get('home', 'carousel');
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
            css: ['frontend/view/css/filtersDiv.css', 'frontend/view/css/listAll.css', 'frontend/view/css/shopList.css', 'frontend/view/css/likeBtn.css', 'frontend/view/css/pagination.css', '//cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.9.0/loading-bar.min.css'],
            controller: "shopController",
            resolve: {
                list: (services) => {
                    cfpLoadingBarProvider.includeSpinner = true;
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
        .when('/verify/:id', {
            templateUrl: "frontend/module/auth/view/AuthForm.html",
            css: ['frontend/view/css/verify.css'],
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
    $rootScope.options = []
    searchServices.getFilterOptions();

    $rootScope.showMenu = () => {
        $rootScope.viewMenu = !$rootScope.viewMenu
    }

    $rootScope.search = function(idParent) {
        searchServices.setFindFilters(idParent);
    }

})