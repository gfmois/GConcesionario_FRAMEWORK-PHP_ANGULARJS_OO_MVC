<?php
    class Connection {
        private $host;
        private $user;
        private $db;
        private $password;
        private $link;
        private $stmt;
        private $array;
        static $_instance;

        private function __construct() {
            $this->setConnection();
            $this->connect();
        }

        private function setConnection() {
            require_once 'Conf.class.singleton.php';
            $conf = Conf::getInstance();

            $this->host = $conf->getHost_DB();
            $this->user = $conf->getUserDB();
            $this->password = $conf->getPasswdDB();
            $this->db = $conf->getDatabase_DB();
        }

        private function __clone() {}

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        private function connect() {
            $this->link = new mysqli($this->host, $this->user, $this->password);
            $this->link->select_db($this->db);
        }

        public function select($sql) {
            $this->stmt = $this->link->query($sql);
            return $this->stmt;
        }

        public function selectObject($sql) {
            $this->stmt = $this->link->query($sql)->fetch_object();
            return $this->stmt;
        }

        public function list($stmt) {
            $this->array = array();
            while ($row = $stmt->fetch_array(MYSQLI_ASSOC)) {
                array_push($this->array, $row);
            }

            return $this->array;
        }

        public function multiSelect(String $sql) {
            $this->stmt = $this->link->multi_query($sql);
            $this->array = array();
            $index = 0;

            if ($this->stmt) {
                do {
                    if ($result = mysqli_store_result($this->link)) {
                        while ($row = mysqli_fetch_row($result)) {
                            $this->array[$index][] = $row;
                        }
                        mysqli_free_result($result);
                        $index++;
                    }
                } while (mysqli_next_result($this->link));
            }
        
            return $this->array;
        }

        public function multiSelectToObj(String $sql) {
            $this->stmt = $this->link->multi_query($sql);
            $this->array = array();
            $index = 0;

            if ($this->stmt) {
                do {
                    if ($result = mysqli_store_result($this->link)) {
                        while ($row = mysqli_fetch_object($result)) {
                            $this->array[$index][] = $row;
                        }
                        mysqli_free_result($result);
                        $index++;
                    }
                } while (mysqli_next_result($this->link));
            }

            return $this->array;
        }
    }