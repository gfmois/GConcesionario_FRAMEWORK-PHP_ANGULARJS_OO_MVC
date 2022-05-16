app.controller('homeController', ($scope, $window, carousel, category, type) => {
    $scope.slideC = carousel;
    $scope.sliderCat = category;
    $scope.slideType = type;

    new Swiper('.swiper', {
        direction: 'horizontal',
        speed: 400,
        loop: true,
        slidesPerView: 3,
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 3500
        },
    })

})