app.controller('shopController', ($scope, $rootScope, $routeParams, $route, $timeout, cfpLoadingBar, list, filters, shopServices) => {
    let path = $route.current.originalPath.split('/');
    const start = () => {
        cfpLoadingBar.start();
    }

    const complete = () => {
        cfpLoadingBar.complete();
    }

    start();
    $scope.fakeIntro = true;
    $timeout(function() {
      complete();
      $scope.fakeIntro = false;    
      ck_fakeAnimation()    
    }, 750);

    function ck_fakeAnimation() {
        if (path[1] == "shop") {
            if (!$scope.fakeIntro) {
                $scope.detailsView = false;
                $scope.shopView = true;
            }
        } else if (path[1] == "details") {
            $scope.detailsView = true;
            $scope.shopView = false;
        }
    }

    $scope.count = 0;
    
    // --------> PAGINATION <---------;
    $scope.get_n_page = shopServices.getPagination(list);
    $scope.nPage = 0;

    // --------> DETAILS <----------
    // Imagen Grande del details
    $scope.initImage = 0;
    $scope.setInitImage = function() {
        $scope.initImage = this.$parent.$parent.carDetails.images.findIndex((item) => item.src == this.img.src);
    }

    $scope.getDetails = function(id = null) {
        let checkID = id == null ? this.car.id : id;

        shopServices.getCarDetails(checkID).then((data) => {
            $rootScope.carDetails = data;
        });

        location.href = "#/details/" + checkID;
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

    // ----------> SHOP <------------

    $scope.cars = list?.length > 0 ? list[0] : [];
    $scope.totalFilters = []
    $scope.filterName = [
        "Marcas", "Modelos", "Tipos", "Carroceria", "Categoria"
    ];
    $scope.active_ckbox = {};

    $scope.hide = false;
    $scope.setFilter = function() {
        localStorage.setItem('filters', JSON.stringify(shopServices.setFilter(this.item.id, $scope.filterName.findIndex((item) => item == this.$parent.obj.name) + 1)))

        shopServices.getFilteredCars().then((data) => {
            $scope.cars = data?.length > 0 ? data : list[0].length > 0 ? list[0] : []
            shopServices.startMap($scope.cars)
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

    $scope.changePage = function() {
        if (this.index != $scope.nPage) {
            $scope.nPage = this.index 
            shopServices.getPageCars(this.index +1).then((cars) => {
                $scope.cars = cars[0]?.length > 0 ? cars[0] : []
                shopServices.startMap($scope.cars)
            });
        }
    }

    $scope.setLike = function() {
        console.log(shopServices.setLike(this.car.id));
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
                        })
                    }
                }

                item.forEach((val, index) => {
                    shopServices.setFilter(val.id, $scope.filterName.findIndex((item) => item == val.parent) + 1);
                })

                shopServices.getFilteredCars().then((data) => {
                    $scope.cars = data?.length > 0 ? data : list[0].length > 0 ? list[0] : [];
                });
            }
        }, 0)
    }

    shopServices.startMap($scope.cars)

    set_hlight_filters()
})