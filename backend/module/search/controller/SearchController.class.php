<?php
    class SearchController {
        function types() {
            echo json_encode(common::loadModel('SearchModel', 'loadTypes'));
        }

        function brands() {
            echo json_encode(common::loadModel('SearchModel', "loadBrands"));
        }

        function findOptions() {
            echo json_encode(common::loadModel('SearchModel', "loadFindOptions", $_POST["options"]));
        }
    }
?>