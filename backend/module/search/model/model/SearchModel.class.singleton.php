<?php
    class SearchModel {
        private $bll;
        static $_instance;

        function __construct() {
            $this->bll = SearchBLL::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function loadTypes() {
            return $this->bll->getTypesBLL();
        }

        public function loadBrands() {
            return $this->bll->getBrandsBLL();
        }

        public function loadFindOptions($options) {
            return $this->bll->getFindOptions($options);
        }
    }
?>