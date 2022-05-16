<?php
    class AuthController {
        function view() {
            common::loadView('top_page.html', VIEW_PATH_AUTH . 'AuthForm.html');
        }

        function register() {
            echo json_encode(common::loadModel('AuthModel', 'loadRegisterUser', $_POST));
        }

        function login() {
            echo json_encode(common::loadModel('AuthModel', 'loadLoginUser', $_POST));
        }

        function verification() {
            echo json_encode(common::loadModel('AuthModel', 'loadVerification', $_GET['param']));
        }

        function checkToken() {
            echo json_encode(common::loadModel('AuthModel', 'loadCheckToken', apache_request_headers()["token"]));
        }

        function logout() {
            echo common::loadModel('AuthModel', 'loadLogout', apache_request_headers()["token"]);
        }

        function isVerificated() {
            echo json_encode(common::loadModel('AuthModel', 'loadIsVerificated', $_POST));
        }

    }
?>