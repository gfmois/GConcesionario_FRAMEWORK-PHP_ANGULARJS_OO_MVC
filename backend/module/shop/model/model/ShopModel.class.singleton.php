<?php 
    class ShopModel {
        private $bll;
        static $_instance;

        function __construct() {
            $this->bll = ShopBLL::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function loadAllCars($page) {
            return $this->bll->getAllBLL($page);
        }

        public function loadCars() {
            return $this->bll->getCarsBLL();
        }

        public function loadFromCar(String $id) {
            return $this->bll->getFromCarBLL($id);
        }

        public function loadFromFilters(Array $options) {
            return $this->bll->getFromFilters($options[0], $options[1]);
        }

        public function loadAddCount(String $carVIN) {
            return $this->bll->getResultAddCount($carVIN);
        }

        public function loadLikes($token) {
            return $this->bll->getLikesBLL($token);
        }

        public function loadLikeStatus($args) {
            return $this->bll->getLikeStatusBLL($args[0], $args[1]);
        }
    }

?>