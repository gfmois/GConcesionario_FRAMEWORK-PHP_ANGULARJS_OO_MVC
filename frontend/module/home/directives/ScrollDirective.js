app.directive("scroll", function ($window, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('scroll', (e) => {
                let div = document.getElementById(e.path[0].id);
                if (div.offsetHeight + div.scrollTop >= div.scrollHeight) {
                    $rootScope.loadMore();
                }

            })
        }
    }
});