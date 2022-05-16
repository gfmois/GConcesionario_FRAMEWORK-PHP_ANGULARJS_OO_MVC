<?php 
    class ShopDAO {
        private $jwt;
        private $iniFile;
        static $_instance;

        private function __construct() {
            $this->jwt = JWT::getInstance();
            $this->iniFile = parse_ini_file('model/Config.ini');
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function getAllData(Connection $db, $page) {
            $page = $page - 1;
            $limitPage = $page * 8;

            $sql = "SELECT c.*, b.*, m.* FROM cars c, brand b, model m WHERE c.id_model = m.id_model AND m.id_brand = b.id_brand ORDER BY count DESC LIMIT $limitPage, 8";
            $query = "SELECT COUNT(*) AS n_cars FROM cars";

            $stmt = $db->select($sql);
            $stmt_2 = $db->select($query);

            return array(
                0 => $db->list($stmt),
                1 => $db->list($stmt_2)
            );
        }

        public function getDataCars(Connection $db) {
            $sql = "SELECT * FROM brand b; 
                    SELECT * FROM model m; 
                    SELECT * FROM type t; 
                    SELECT * FROM body b; 
                    SELECT * FROM category c";

            $stmt = $db->multiSelect($sql);

            return $stmt;
        }

        public function getDataFromCar(Connection $db, $id) {
            $sql = "SELECT c.*, b.*, m.* 
                    FROM cars c, brand b, model m 
                    WHERE c.id = $id 
                    AND c.id_model = m.id_model 
                    AND m.id_brand = b.id_brand;";
            $sql .= "SELECT imgUrl FROM car_imgs WHERE carID = $id;";
            $sql .= "SELECT a.*, o.*, b.* 
                    FROM cars a, model o, brand b 
                    WHERE b.id_brand = o.id_brand 
                    AND a.id NOT LIKE " . "'" . $id . "'" . 
                    " AND a.id_model = o.id_model 
                    AND o.id_brand IN (
                        SELECT m.id_brand 
                        FROM cars c, model m 
                        WHERE c.id_model = m.id_model 
                        AND c.id = " . "'" . $id . "');";
    
            $stmt = $db->multiSelectToObj($sql);
    
            return $stmt;
        }

        public function getDataFromFilteredCars(Connection $db, Array $filters, int $pagination) {
            if ($pagination != null || 0) $pagination = $pagination - 1;

            $limitPage = $pagination * 8;

            if (!isset($filters)) $sql = "SELECT * FROM cars";
            else {
                $sql = "SELECT *, b.brand_name, m.model_name 
                        FROM cars c 
                        INNER JOIN model m ON m.id_model = c.id_model 
                        INNER JOIN brand b ON m.id_brand = b.id_brand";

                foreach ($filters as $key => $value) {
                    unset($llave);
                    $llave = $key;
                    for ($i = 0; $i < count($filters[$key]); $i++) {
                            if (key($filters) && $i == 0) {
                                if ($llave == array_keys($filters)[0]) {
                                    if ($llave == "id_brand") {
                                        if (count($filters[$llave]) > 1) {
                                            $sql .= "WHERE c.id_model IN (SELECT m.id_model FROM model m WHERE m.id_brand = " . '"' . $filters[$key][0] . '"';
                                            for ($j = 1; $j < count($filters[$llave]);  $j++) {
                                                $sql .= " OR m.id_brand = " . '"' . $filters[$key][$j] . '"';
                                            }
                                        } else {
                                            $sql .= " WHERE c.id_model IN " . "(SELECT m.id_model FROM model m WHERE m.id_brand = " . '"' . $filters[$key][0] . '"' ;
                                        }
                                        $sql .= ")";
                                    } else if ($llave == "city") {
                                        $sql .= "WHERE " . $llave . " LIKE " . "'" . $filters[$key][0] . "%'";
                                    } else if ($llave == "orderBy") {
                                        if ($filters[$llave][0] == "count") {
                                            if (count($filters[$llave]) > 1) {
                                                $sql .= " ORDER BY c." . $filters[$key][0] . " DESC";
                                                for ($j = 1; $j < count($filters[$llave]); $j++) {
                                                    $sql .= ", c.id_" . $filters[$llave][$j] . " DESC";
                                                }
                                            } else {
                                                $sql .= " ORDER BY c." . $filters[$key][0] . " DESC";
                                            }
                                        } else {
                                            if (count($filters[$llave]) > 1) {
                                                $sql .= " ORDER BY c.id_" . $filters[$key][0] . " DESC";
                                                for ($j = 1; $j < count($filters[$llave]); $j++) {
                                                    $sql .= ", c.id_" . $filters[$llave][$j] . " DESC";
                                                }
                                            } else {
                                                $sql .= " ORDER BY c.id_" . $filters[$key][0] . " DESC";
                                            }
                                        }
                                    } else if ($llave != "id_brand" && $llave != "city" && $llave != "orderBy") {
                                        $sql .= " WHERE c." . $llave . " = " . '"' . $filters[$key][0] . '"' ;
                                    } 
                                } else {
                                    if ($llave != "id_brand" && $llave != "city") {
                                        $sql .= " AND c." . $llave . " = " . '"' . $filters[$key][0] . '"' ;
                                    } else if ($llave == "id_brand") {
                                        if (count($filters[$llave]) > 1) {
                                            $sql .= " AND " . " c.id_model IN " . "(SELECT m.id_model FROM model m WHERE m.id_brand = " . "'" . $filters[$key][0] . "'";
                                            for ($j = 1; $j < count($filters[$llave]);  $j++) {
                                                $sql .= " OR m.id_brand = " . '"' . $filters[$key][$j] . '"';
                                            }
                                        } else {
                                            $sql .= " AND c.id_model IN (SELECT m.id_model FROM model m WHERE m.id_brand = " . "'" . $filters[$key][0] . "'";
                                        }
                                        $sql .= ")";
                                    }
                                }
                            } else if ($llave != "id_brand" && $llave != "orderBy") {
                                $sql .= " OR c." . $llave . " = " . '"' . $filters[$key][$i] . '"';
                            }

                    }

                }
                
                $sql .= " LIMIT $limitPage, 8";    

                $stmt = $db->select($sql);
                return $db->list($stmt);
            }
        }

        public function addCountToCar(Connection $db, $carVIN) {
            $sql = "UPDATE cars 
                    SET count = count + 1 
                    WHERE vin_number = ";

            foreach ($carVIN as $key => $val) {
                $sql .= "'" . $val . "'";
            }

            $stmt = $db->select($sql);
            
            if ($stmt) return "Success"; else return "Error";
        }

        public function getDataLikes(Connection $db, $token) {
            $decodedUser = json_decode(JWT_Process::decode($token))->user;
            $sql = "SELECT vin_number FROM cars WHERE id IN (SELECT idCar FROM likes WHERE username LIKE " . "'" . $decodedUser . "'" . ")";
            return $db->list($db->select($sql));
        }

        public function getDataStatusLike(Connection $db, $token, $idCar) {
            $decodedUser = json_decode(JWT_Process::decode($token))->user;
            $id = "SELECT id FROM cars WHERE vin_number = " . "'" . $idCar . "'";
            $sql = "SELECT * FROM likes WHERE username LIKE " . "'" . $decodedUser . "' AND idCar = (" . $id . ")";
            
            $stmt = $db->select($sql);
            if (mysqli_num_rows($stmt) > 0) {
                $query = "DELETE FROM likes WHERE idCar = (" . $id . ") AND username LIKE " . "'" . $decodedUser . "'"; 
            } else  {
                $query = "INSERT INTO likes VALUES (" . "'" . $decodedUser . "', (" . $id . "))";
            }

            $rStmt = $db->select($query);

            return $rStmt;
        }
    }    
?>
