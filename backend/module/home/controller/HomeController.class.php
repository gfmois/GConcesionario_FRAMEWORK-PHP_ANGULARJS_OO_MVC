<?php
    class HomeController {
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