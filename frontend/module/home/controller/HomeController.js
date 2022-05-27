app.controller('homeController', ($rootScope, $scope, $window, carousel, category, type, homeService) => {
    $rootScope.final = false;
    $scope.slideC = carousel;
    $scope.sliderCat = category;
    $scope.slideType = type;

    setTimeout(() => {
        new Swiper('.swiper', {
            direction: 'horizontal',
            speed: 400,
            loop: true,
            slideToClickedSlide: true,
            loopedSlides: 50,
            slidesPerView: 3,
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 2500
            },
        })
    }, 0)


    $rootScope.limit = 0;
    $rootScope.loadMore = function() {
        homeService.getNews();
        console.log(homeService.getNews());
        $rootScope.limit += 3;

    };    

    $rootScope.loadMore();

})