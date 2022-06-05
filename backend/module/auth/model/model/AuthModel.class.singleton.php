<?php
    class AuthModel {
        private $bll;
        static $_instance;

        function __construct() {
            $this->bll = AuthBLL::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function loadRegisterUser($args) {
            return $this->bll->registerUserBLL($args);
        }

        public function loadLoginUser($args) {
            return $this->bll->loginUserBLL($args);
        }

        public function loadVerification($args) {
            return $this->bll->verificationBLL($args);
        }

        public function loadCheckToken($token) {
            return $this->bll->checkTokenBLL($token);
        }

        public function loadLogout($args) {
            return $this->bll->logoutBLL($args);
        }

        public function loadIsVerificated($args) {
            return $this->bll->checkIfVerificated($args);
        }

        public function loadChangePasswd($args) {
            return $this->bll->chgePasswdBLL($args);
        }
    }
?>