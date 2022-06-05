app.factory('searchServices', ['services', '$rootScope', (services, $rootScope) => {
    let service = {
        getFilterOptions: getFilterOptions,
        setFindFilters: setFindFilters
    }
    return service;

    function getFilterOptions() {
        services.get('shop', 'cars').then((res) => {
            let options = {
                brands: [],
                categories: [],
            }

            res[0].forEach((brand) => {
                options.brands.push({
                    id: brand[0],
                    name: brand[1]
                })
            })

            res[4].forEach((item) => {
                options.categories.push({
                    id: item[0],
                    name: item[1]
                })
            })

            
            $rootScope.s_options = options;
        })
    }

    async function setFindFilters(parent) {
        let d_parent = document.getElementById(parent);
        console.log();
        let filters =  { 
            city: [],
            id_brand: [],
            id_model: [],
            id_type: [],
            id_body: [],
            id_cat: [],
        };

        console.log(filters);

        for (let i = 0; i < d_parent.children.length; i++) {
            if (d_parent.children[i].nodeName == "DIV" || d_parent.children[i].nodeName == "INPUT") {
                if (d_parent.children[i].nodeName == "DIV") {
                    let id = d_parent.children[i].children[0].value;
                    await services.get('shop', 'cars').then((res) => {
                        res[0].forEach((brand, index) => {
                            res[0][index].includes(id) ? filters.id_brand.push(id) : null
                        })

                        res[4].forEach((cat, index) => {
                            res[4][index].includes(id) ? filters.id_cat.push(id) : null
                        })
                    })
                } else if (d_parent.children[i].nodeName == "INPUT") {
                    if (d_parent.children[i].value.length > 0) {
                        console.log('AAA');
                        filters.city.push(d_parent.children[i].value);
                    }
                }
            }
        }

        localStorage.setItem('filters', JSON.stringify(filters));
        location.href = "#/shop";
        
    }
    
}])