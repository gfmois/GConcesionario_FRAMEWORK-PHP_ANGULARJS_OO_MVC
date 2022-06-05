app.factory('homeService', ['services', '$rootScope', (services, $rootScope) => {
    let service = { getNews: getNews }
    $rootScope.news = []
    return service;
    

    function getNews() {
        $rootScope.news = []
        let url = "https://gnews.io/api/v4/search?"
        let apiKey = "609c2abc60427bbd38546eef259cf7ee"
        let urlParams = "lang=es&max=10&topic=technology"
        let newsThemes = ["AUDI", "BMW", "Tesla", "Ford", "Fiat"]
        const params = new URLSearchParams(encodeURI(urlParams))

        localStorage.setItem('clickCount', 0)

        if (newsThemes[parseInt(localStorage.getItem('newsSection'))] != undefined) {
            params.set('q', newsThemes[parseInt(localStorage.getItem('newsSection'))])
        } else {
            params.set('q', newsThemes[parseInt(Math.random() * (4 - 0) + 0)])
        }
        params.set('token', apiKey)
    
        url += params.toString()

        window.addEventListener('load', () => {
            if (typeof newsThemes[parseInt(localStorage.getItem('newsSection'))] == "undefined") {
                localStorage.setItem('newsSection', 0)
            } else {
                let nNew = parseInt(localStorage.getItem('newsSection')) + 1
                localStorage.setItem('newsSection', nNew)
            }
        })

        services.getAPI(url).then((data) => {
            data.articles.forEach((article) => {
                $rootScope.news.push(article)
            })

            console.log($rootScope.news);
        })
    }
}])