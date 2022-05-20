app.controller('shopController', ($scope, $window, list, filters) => {
    $scope.cars = list[0];
    $scope.totalFilters = []
    $scope.filterName = [
        "Marcas", "Modelos", "Tipos", "Carroceria", "Categoria"
    ];

    $scope.logThisAndScope = () => {
        console.log(this, $scope);
    }

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

    console.log($scope.totalFilters);
})