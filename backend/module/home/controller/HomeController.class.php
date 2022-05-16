<?php
    class HomeController {
        function view() {
            common::loadView('top_page_home.html', VIEW_PATH_INC . 'content.html');
            common::loadView('top_page_home.html', VIEW_PATH_HOME . 'homepage.html');
        }
        
        function carousel() {
            echo json_encode(common::loadModel('HomeModel', 'loadCarousel'));
        }

        function category() {
            echo json_encode(common::loadModel('HomeModel', 'loadCategories'));
        }

        function brands() {
            echo json_encode(common::loadModel('HomeModel', "getBrands", [$_POST['items'], $_POST['loaded']]));
        }

        function types() {
            echo json_encode(common::loadModel('HomeModel', 'loadTypes'));
        }

        function loadMore() {
            echo json_encode(common::loadModel('HomeModel', 'getLoadMore'));
        }

    }
?>