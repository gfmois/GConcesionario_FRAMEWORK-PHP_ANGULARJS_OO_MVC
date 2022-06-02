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
        $rootScope.limit += 3;
    };    

    $scope.toShop = function() {
        let obj = JSON.parse(localStorage.getItem('filters'));
        
        for (let i = 0; i < Object.keys(obj).length; i++) {
            obj[Object.keys(obj)[i]] = [];
            if (Object.keys(obj)[i] == Object.keys(this.item)[0]) {
                obj[Object.keys(obj)[i]] = [this.item[Object.keys(obj)[i]]]
            }
        }

        localStorage.setItem('filters', JSON.stringify(obj));
        location.href = '#/shop';
    }

    $rootScope.loadMore();

})