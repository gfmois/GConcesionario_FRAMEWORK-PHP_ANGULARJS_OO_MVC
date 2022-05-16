<?php
    class HomeDAO {
        static $_instance;

        private function __construct() {}

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function getDataCarousel(Connection $db) {
            $sql = "SELECT * FROM brand";
            $stmt = $db->select($sql);

            return $db->list($stmt);
        }

        public function getDataType(Connection $db) {
            $sql = "SELECT * FROM type";
            $stmt = $db->select($sql);

            return $db->list($stmt);
        }

        public function getDataCategory(Connection $db) {
            $sql = "SELECT * FROM category";
            $stmt = $db->select($sql);

            return $db->list($stmt);
        }

        public function getLoadMore(Connection $db) {
            $sql = "SELECT COUNT(*) AS 'count' FROM brand";
            $stmt = $db->select($sql);

            return $db->list($stmt);
        }

        public function getDataBrands(Connection $db, $items, $loaded) {
            $sql = "SELECT * FROM brand LIMIT $loaded, $items";
            $stmt = $db->select($sql);

            return $db->list($stmt);
        }

    }
?>