<?php 
    class SearchBLL {
        private $searchDAO;
        private $db;
        static $_instance;

        function __construct() {
            $this->searchDAO = SearchDAO::getInstance();
            $this->db = Connection::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function getTypesBLL() {
            return $this->searchDAO->getDataTypes($this->db);
        }

        public function getBrandsBLL() {
            return $this->searchDAO->getDataBrands($this->db);
        }

        public function getFindOptions($options) {
            return $this->searchDAO->getDataFindOptions($this->db, $options);
        }
    }

?>