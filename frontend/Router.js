let app = angular.module('GConcesionario_FRAMEWORK_ANGULARJS_OO_MVC', ['ngRoute', 'toastr', 'routeStyles', 'angular-loading-bar', 'auth0.auth0']);

app.config(['$routeProvider', 'cfpLoadingBarProvider', 'angularAuth0Provider', ($routeProvider, cfpLoadingBarProvider, angularAuth0Provider) => {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;

    angularAuth0Provider.init({
        clientID: "dPVXErytsisi3Iw5xV6pS4NyRFIVU7GA",
        domain: "dev--h21qj3n.us.auth0.com",
        responseType: 'token id_token',
        redirectUri: "http://localhost/GConcesionario_FRAMEWORK_ANGULARJS_OO_MVC/#/auth",
        scope: 'openid profile email'
    });

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
            css: ['frontend/view/css/details.css', 'frontend/view/css/thumbCarousel.css', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css', 'frontend/view/css/buttons.css', 'frontend/view/css/shopList.css'],
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
        .when('/profile', {
            templateUrl: 'frontend/module/auth/view/Profile.html',
            css: ['frontend/view/css/profile.css'],
            controller: 'profileController',
        })
        .when('/recover', {
            templateUrl: 'frontend/module/auth/view/Recover.html',
            css: ['frontend/view/css/recover.css'],
            controller: 'authController',
        })
        .when('/recover/:id', {
            templateUrl: 'frontend/module/auth/view/Recover.html',
            css: ['frontend/view/css/recover.css'],
            controller: 'authController',
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

app.run(($rootScope, searchServices, authService) => {
    $rootScope.viewMenu = false;
    $rootScope.options = []
    searchServices.getFilterOptions();

    $rootScope.showMenu = () => {
        $rootScope.viewMenu = !$rootScope.viewMenu
    }

    $rootScope.search = function(idParent) {
        searchServices.setFindFilters(idParent);
    }

    $rootScope.usrSetting = localStorage.getItem('token') != null ? true : false;
    $rootScope.authSetting = localStorage.getItem('token') == null ? true : false;

    if (localStorage.getItem('token') != null) {
        $rootScope.usr_status = true;
        authService.getUserInfo().then((usr_info) => {
            $rootScope.usr_info = usr_info;
        })

    }

    // authService.logout();
    authService.handleAuthentication().then((data) => {
        let real_obj = {
            username: data.idTokenPayload.nickname,
            email: data.idTokenPayload.email,
            avatar: data.idTokenPayload.picture,
            password: null,
            ck_passwd: null,
            uuid: data.idTokenPayload.sub.split('|')[1],
        }

        if (typeof authService.rg_checkUserInfo(real_obj).then == "function" ) {
            authService.rg_checkUserInfo(real_obj).then((data) => {
                if (data.result.code != 404 || data.result.code != 56) {
                    authService.lg_checkUserInfo({
                        username: real_obj.username
                    }).then((msg) => {
                        $rootScope.social = true;
                        localStorage.setItem('token', msg);
                        location.reload()
                    })
                }
            })
        } else {
            Swal.fire({
                title: 'Error',
                text: authService.rg_checkUserInfo(real_obj),
                icon: 'error',
                confirmButtonText: 'Está bien'
            })
        }
    })

    $rootScope.close_sesion = function() {
        localStorage.removeItem('token');
        location.reload();
        location.href = "#/home";
    }
})