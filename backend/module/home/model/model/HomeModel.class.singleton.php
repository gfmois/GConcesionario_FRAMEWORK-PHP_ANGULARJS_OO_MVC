<?php
    class HomeModel {
        private $bll;
        static $_instance;

        function __construct() {
            $this->bll = HomeBLL::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function loadCarousel() {
            return $this->bll->getCarouselBLL();
        }

        public function loadCategories() {
            return $this->bll->getCategoriesBLL();
        }

        public function loadBrands($args) {
            return $this->bll->getBrandsBLL($args);
        }

        public function getLoadMore() {
            return $this->bll->getLoadMoreBLL();
        }

        public function loadTypes() {
            return $this->bll->getTypesBLL();
        }

    }
?>