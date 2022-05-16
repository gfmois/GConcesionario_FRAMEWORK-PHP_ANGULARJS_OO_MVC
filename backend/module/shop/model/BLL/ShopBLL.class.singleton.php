<?php 
    class ShopBLL {
        private $shopDAO;
        private $db;
        static $_instance;

        function __construct() {
            $this->shopDAO = ShopDAO::getInstance();
            $this->db = Connection::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function getAllBLL($page = 1) {
            return $this->shopDAO->getAllData($this->db, $page);
        }

        public function getCarsBLL() {
            return $this->shopDAO->getDataCars($this->db);
        }

        public function getFromCarBLL(String $id) {
            return $this->shopDAO->getDataFromCar($this->db, $id);
        }

        public function getFromFilters(Array $filters, int $page) {
            return $this->shopDAO->getDataFromFilteredCars($this->db, $filters, $page);
        }

        public function getResultAddCount(String $carVIN) {
            return $this->shopDAO->addCountToCar($this->db, $carVIN);
        }

        public function getLikesBLL($token) {
            return $this->shopDAO->getDataLikes($this->db, $token);
        }

        public function getLikeStatusBLL($token, $idCar) {
            return $this->shopDAO->getDataStatusLike($this->db, $token, $idCar);
        }
    }
?>