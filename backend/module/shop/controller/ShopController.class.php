<?php
    class ShopController {
        // function view() {
        //     common::loadView('top_page.html', VIEW_PATH_SHOP . 'Shop.html');
        // }

        function allCars() {
            // print_r($_POST);
            echo json_encode(common::loadModel('ShopModel', 'loadAllCars', $_POST['pagination'] ?? 1));
        }

        function cars() {
            echo json_encode(common::loadModel('ShopModel', 'loadCars'));
        }

        function fromCar() {
            echo json_encode(common::loadModel('ShopModel', 'loadFromCar', $_POST['id']));
        }

        function fromFilters() {
            // print_r($_POST['filters']);
            echo json_encode(common::loadModel('ShopModel', 'loadFromFilters', [$_POST['filters'] ?? [], $_POST['pagination'] ?? 0]));
        }

        function addCount() {
            echo json_encode(common::loadModel('ShopModel', 'loadAddCount'), $_POST['vin']);
        }

        function likes() {
            echo json_encode(common::loadModel('ShopModel', 'loadLikes', apache_request_headers()["token"]));
        }

        function likeStatus() {
            echo json_encode(common::loadModel('ShopModel', 'loadLikeStatus', [apache_request_headers()['token'], $_POST["idCar"]]));
        }
    }