app.factory('shopServices', ['services', '$rootScope', '$route', (services, $rootScope, $route) => {
    let service = { 
        setFilter: setFilter, 
        getCarDetails: getCarDetails, 
        getFilteredCars: getFilteredCars, 
        setLike: setLike,
        getPagination: getPagination,
        getPageCars: getPageCars
    };
    let filters = {
        city: [],
        id_brand: [],
        id_model: [],
        id_type: [],
        id_body: [],
        id_cat: [],
    }
    return service;

    function getCarDetails(id) {
        return services.post('shop', 'fromCar', {id: id}).then((data) => {
            let details = {
                brand: data[0][0].brand_name,
                model: data[0][0].model_name,
                images: [],
                related_cars: []
            }

            if (typeof data[1] == "object" && data[1].length > 0) {
                data[1].forEach(item => {
                    if (!item.imgUrl.includes('https')) item.imgUrl = "frontend/" + item.imgUrl

                    details.images.push({
                        src: item.imgUrl
                    })
                })
            }
            
            if (typeof data[2] == "object" && data[2].length > 0) {
                data[2].forEach(item => {
                    details.related_cars.push({
                        id: item.id,
                        brand: item.brand_name,
                        model: item.model_name
                    })
                })
            }

            return details;

        })
    }

    function setFilter(id, property) {
        Object.values(filters).forEach((item, index) => {
            if (Object.keys(filters)[index] == Object.keys(filters)[property]) {
                if (!item.includes(id)) {
                    item.push(id)
                } else {
                    if (item.indexOf(id) > -1) {
                        let keys = []

                        for (const key in filters) {
                            keys.push(key)
                        }

                        let k_index = keys.findIndex((val, index) => {
                            return val == Object.keys(filters)[property];
                        })

                        if (k_index > -1) {
                            filters[Object.keys(filters)[k_index]] = item.filter((val, index) => {
                                return  val != id
                            });
                        }
                    }
                }
            }
        });

        return filters;
    }

    function getFilteredCars() {
        return services.post('shop', 'fromFilters', {filters: JSON.parse(localStorage.getItem('filters'))}).then((data) => {
            return data;
        })
    }

    async function getPagination(list) {
        let f_obj = JSON.parse(localStorage.getItem('filters'));
        let n_pages = 0;
        let hasFilters = false;
        
        if ($route.current.originalPath.split('/')[1] != "details") {
            for (let i = 0; i < Object.keys(f_obj).length; i++) {
                if (Object.values(f_obj)[i].length > 0) {
                    hasFilters = true;
                }
            }

            await getFilteredCars().then((data) => {
            if (hasFilters) {
                n_pages = Math.ceil(data.length / 8)
            } else {
                n_pages = Math.ceil(list[1][0].n_cars / 8);
            }
            });
         
            $rootScope.get_n_pages = n_pages
        }
    }

    function setLike(id) {
        return id;
    }

    function getPageCars(page) {
        return services.post('shop', 'allCars', {pagination: page}).then((data) => {
            return data
        })
    }
}])