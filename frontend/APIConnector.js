app.factory('services', ['$http', '$q', ($http, $q) => {
    let servicesBase = '/GConcesionario_FRAMEWORK_ANGULARJS_OO_MVC/backend/index.php?page=';
    let obj = {};


    obj.get = (module, funct) => {
        let defered = $q.defer();
        let promise = defered.promise;

        $http({
            method: 'GET',
            url: servicesBase + module + '&op=' + funct
        }).success((data, status, headers, config) => {
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        });

        return promise;
    }

    obj.getAPI = (url) => {
        let defered = $q.defer();
        let promise = defered.promise;

        $http({
            method: 'GET',
            url: url
        }).success((data, status, headers, config) => {
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        });

        return promise;
    }

    obj.post = (module, funct) => {
        let defered = $q.defer();
        let promise = defered.promise;

        $http({
            method: "POST",
            url: servicesBase + module + "&op=" + funct
        }).success((data, status, headers, config) => {
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        })

        return promise;
    }

    obj.post = (module, option, data) => {
        let defered = $q.defer();
        let promise = defered.promise;

        $http({
            method: 'POST',
            url: servicesBase + module + "&op=" + option,
            data: data,
        }).success((data, status, headers, config) => {
            defered.resolve(data)
        }).error((data, status, headers, config) => {
            defered.reject(data)
        });

        return promise
    }

    return obj;
}])