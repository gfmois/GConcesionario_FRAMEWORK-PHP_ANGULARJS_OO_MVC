<?php
    class SearchDAO {
        static $_instance;
        
        private function __construct() {}

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function getDataTypes(Connection $db) {
            $sql = "SELECT DISTINCT id_cat, cat_name FROM category";
            $stmt = $db->select($sql);

            return $db->list($stmt);
        }

        public function getDataBrands(Connection $db) {
            $sql = "SELECT DISTINCT id_brand, brand_name FROM brand";
            $stmt = $db->select($sql);

            return $db->list($stmt);
        }

        public function getDataFindOptions(Connection $db, $option) {
            $sql = "SELECT * FROM ";
            if (empty($option)) {
                $sql = "SELECT * FROM cars";
            } else {
                $sql = "SELECT m.id_model, m.model_name, b.id_brand, b.brand_name, cat.id_cat, cat.cat_name FROM cars c INNER JOIN model m ON c.id_model = m.id_model INNER JOIN brand b ON m.id_brand = b.id_brand INNER JOIN category cat ON cat.id_cat = c.id_cat ";
                $contentKets = array();

                foreach($option as $key => $val) {
                    $llave = $key;
                    
                    if (!empty($option[$llave])) {
                        $contentKeys[] = $key;
                    }
                }

                for ($i = 0; $i < count($contentKeys); $i++) {
                    if ($i == 0 && $contentKeys[$i] != "id_brand") {
                        if ($contentKeys[$i] == "city") {
                            $sql .= "WHERE c." . $contentKeys[$i] . " LIKE " . "'" . $option[$contentKeys[$i]] . "%' ";
                        } else {
                            $sql .= "WHERE c." . $contentKeys[$i] . " = " . "'" . $option[$contentKeys[$i]] . "' ";
                        }
                    } else if ($i != 0 && $contentKeys[$i] != "id_brand") {
                        $sql .= "AND c." . $contentKeys[$i] . " = " . "'" . $option[$contentKeys[$i]] . "' ";
                    } else if ($contentKeys[$i] == "id_brand") {
                        if ($i == 0) {
                            $sql .= "WHERE c.id_model IN (SELECT m.id_model FROM model m WHERE m.id_brand = " . "'" . $option[$contentKeys[$i]] . "'" . ")";
                        } else {
                            $sql .= "AND c.id_model IN (SELECT m.id_model FROM model m WHERE m.id_brand = " . "'" . $option[$contentKeys[$i]] . "'" . ")";
                        }
                    }
                }

                $stmt = $db->select($sql);

                return $db->list($stmt);
            }
        }
    }

?>