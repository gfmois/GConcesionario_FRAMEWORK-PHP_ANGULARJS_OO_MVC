<?php
    class Conf {
        private $_userDB;
        private $_hostDB;
        private $_passwdDB;
        private $_db;
        static $_instance;

        private function __construct() {
            $iniFile = parse_ini_file('Config.ini', true);
            $this->_hostDB = $iniFile["Connection"]["host"];
            $this->_userDB = $iniFile["Connection"]["user"];
            $this->_passwdDB = $iniFile["Connection"]["password"];
            $this->_db = $iniFile["Connection"]["db"];
        }

        private function __clone() {}

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function getUserDB() {
            return $this->_userDB;
        }

        public function getPasswdDB() {
            return $this->_passwdDB;
        }

        public function getHost_DB() {
            return $this->_hostDB;
        }

        public function getDatabase_DB() {
            return $this->_db;
        }
    }