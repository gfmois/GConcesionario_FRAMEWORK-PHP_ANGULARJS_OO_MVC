app.controller('shopController', ($scope, $rootScope, $routeParams, $route, list, filters, shopServices) => {
    let path = $route.current.originalPath.split('/');
    if (path[1] == "shop") {
        $scope.detailsView = false;
        $scope.shopView = true;
    } else if (path[1] == "details") {
        $scope.detailsView = true;
        $scope.shopView = false;
    }

    $scope.count = 0;

    // FIXME: Carga solo cuando cierro el panel de opciones.
    $scope.get_n_page = shopServices.getPagination(list);

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
        $scope.count++;
        localStorage.setItem('filters', JSON.stringify(shopServices.setFilter(this.item.id, $scope.filterName.findIndex((item) => item == this.$parent.obj.name) + 1)))

        shopServices.getFilteredCars().then((data) => {
            $scope.cars = data?.length > 0 ? data : list[0].length > 0 ? list[0] : []
        });

        shopServices.getPagination(list);
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

    $scope.setLike = function() {
        console.log(shopServices.setLike(this.car.id));
    }

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
    
    function set_hlight_filters() {
        setTimeout(() => {
            if (localStorage.getItem('filters') != null) {
                let f_obj = JSON.parse(localStorage.getItem('filters'))
                let item = []

                for (let i = 0; i < Object.keys(f_obj).length; i++) {
                    if (Object.values(f_obj)[i].length > 0) {
                        Object.values(f_obj)[i].forEach((val, index) => {
                            item.push({
                                id: document.getElementById(Object.values(f_obj)[i][index]).id,
                                parent: document.getElementById(Object.values(f_obj)[i][index]).parentElement.parentElement.parentElement.childNodes[1].innerText
                            })
                            document.getElementById(Object.values(f_obj)[i][index]).checked = true
                            $scope.count++;
                        })
                    }
                }

                item.forEach((val, index) => {
                    shopServices.setFilter(val.id, $scope.filterName.findIndex((item) => item == val.parent) + 1);
                })

                shopServices.getFilteredCars().then((data) => {
                    $scope.cars = data?.length > 0 ? data : list[0].length > 0 ? list[0] : []
                });
            }
        }, 0)
    }

    set_hlight_filters()
})