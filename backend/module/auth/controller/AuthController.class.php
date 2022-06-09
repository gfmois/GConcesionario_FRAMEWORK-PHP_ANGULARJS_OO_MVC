<?php
    class AuthController {
        function register() {
            echo json_encode(common::loadModel('AuthModel', 'loadRegisterUser', $_POST));
        }

        function login() {
            echo json_encode(common::loadModel('AuthModel', 'loadLoginUser', $_POST));
        }

        function verification() {
            echo json_encode(common::loadModel('AuthModel', 'loadVerification', $_POST['token']));
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

        function change_passwd() {
            echo json_encode(common::loadModel('AuthModel', 'loadChangePasswd', [apache_request_headers()["token"], $_POST['actual'], $_POST['new'], $_POST["ck_new"]]));
        }

        function recover() {
            echo json_encode(common::loadModel('AuthModel', 'loadRecover', $_POST["email"]));
        }

        function recover_passwd() {
           echo json_encode(common::loadModel('AuthModel', 'loadRecoverPasswd', [$_POST['token_email'], $_POST["password"]]));
        }

        function checkUserSession() {
            echo json_encode(common::loadModel('AuthModel', 'loadCheckUserSession'));
        }
    }
?>