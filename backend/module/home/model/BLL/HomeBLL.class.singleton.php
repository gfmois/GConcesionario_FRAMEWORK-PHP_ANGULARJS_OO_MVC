<?php
    class HomeBLL {
        private $homeDAO;
        private $db;
        static $_instance;
        
        function __construct() {
            $this->homeDAO = HomeDAO::getInstance();
            $this->db = Connection::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function getCarouselBLL() {
            return $this->homeDAO->getDataCarousel($this->db);
        }

        public function getCategoriesBLL() {
            return $this->homeDAO->getDataCategory($this->db);
        }

        public function getBrandsBLL($args) {
            return $this->homeDAO->getDataBrands($this->db, $args[0], $args[1]);
        }

        public function getLoadMoreBLL() {
            return $this->homeDAO->getLoadMore($this->db);
        }
        
        public function getTypesBLL() {
            return $this->homeDAO->getDataType($this->db);
        }
    }
?>