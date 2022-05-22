app.controller('shopController', ($scope, $rootScope, $routeParams, $route, list, filters, shopServices) => {
    let path = $route.current.originalPath.split('/');
    if (path[1] == "shop") {
        $scope.detailsView = false;
        $scope.shopView = true;
    } else if (path[1] == "details") {
        $scope.detailsView = true;
        $scope.shopView = false;
    }

    // Imagen Grande del details
    $scope.initImage = 0;
    $scope.setInitImage = function() {
        $scope.initImage = this.$parent.$parent.carDetails.images.findIndex((item) => item.src == this.img.src);
    }

    $scope.cars = list?.length > 0 ? list[0] : [];
    $scope.totalFilters = []
    $scope.filterName = [
        "Marcas", "Modelos", "Tipos", "Carroceria", "Categoria"
    ];
    $scope.active_ckbox = {};

    $scope.hide = false;
    $scope.setFilter = function() {
        localStorage.setItem('filters', JSON.stringify(shopServices.setFilter(this.item.id, $scope.filterName.findIndex((item) => item == this.$parent.obj.name) +1)))

        shopServices.getFilteredCars().then((data) => {
            $scope.cars = data?.length > 0 ? data : list[0].length > 0 ? list[0] : []
        });
    }

    if (filters?.length > 0) {
        filters.forEach((element, index) => {
            let t_obj = {};
    
            t_obj.name = $scope.filterName[index]
            t_obj.options = []
    
            element.forEach(item => {
                let obj = {
                    id: item[0],
                    name: item[1],
                    img: item[2]
                }
    
                t_obj.options.push(obj)
            })
    
            $scope.totalFilters.push(t_obj)
        });

    }

    $scope.getDetails = function(id = null) {
        let checkID = id == null ? this.car.id : id;

        shopServices.getCarDetails(checkID).then((data) => {
            $rootScope.carDetails = data;
        });

        location.href = "#/details/" + checkID;
    }

    // FIXME: Page Reloads 2 times
    if (path[1] == "details") {
        $scope.getDetails($routeParams.id);

        Fancybox.bind("#gallery a", {
            groupAll: true,
            keyboard: {
                Escape: "close",
                Delete: "close",
                Backspace: "close",
                PageUp: "next",
                PageDown: "prev",
                ArrowUp: "next",
                ArrowDown: "prev",
                ArrowRight: "next",
                ArrowLeft: "prev",
            }
        });
    }

})