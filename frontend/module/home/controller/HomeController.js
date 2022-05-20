app.controller('homeController', ($scope, $window, carousel, category, type) => {
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

})