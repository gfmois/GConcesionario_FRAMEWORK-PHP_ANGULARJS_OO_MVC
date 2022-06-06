<?php
    define('PROJECT', '/GConcesionario_FRAMEWORK_ANGULARJS_OO_MVC/backend/');

    // SITE
    define('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . PROJECT);

    define('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . PROJECT);

    // PRODUCTION
    define('PRODUCTION', true);

    //MODEL
    define('MODEL_PATH', SITE_ROOT . 'model/');
    
    //MODULES
    define('MODULES_PATH', SITE_ROOT . 'module/');
    
    //RESOURCES
    define('RESOURCES', SITE_ROOT . 'resources/');
    
    //UTILS
    define('UTILS', SITE_ROOT . 'utils/');

    //VIEW
    define('VIEW_PATH_INC', SITE_ROOT . 'view/include/');

    //CSS
    define('CSS_PATH', SITE_ROOT . 'view/css/');
    
    //JS
    define('JS_PATH', SITE_ROOT . 'view/js/');
    
    //IMG
    define('IMG_PATH', SITE_ROOT . 'view/images/');

    //MODEL_HOME
    define('UTILS_HOME', MODULES_PATH .'home/utils/');
    define('DAO_HOME', MODULES_PATH . 'home/model/DAO/');
    define('BLL_HOME', MODULES_PATH . 'home/model/BLL/');
    define('MODEL_HOME', MODULES_PATH . 'home/model/model/');
    define('JS_VIEW_HOME', SITE_PATH . 'module/home/view/js/');
    define ('VIEW_PATH_HOME', MODULES_PATH . 'home/view/');

    //MODEL_SHOP
    define('UTILS_SHOP', MODULES_PATH . 'shop/utils/');
    define('DAO_SHOP', MODULES_PATH . 'shop/model/DAO/');
    define('BLL_SHOP', MODULES_PATH . 'shop/model/BLL/');
    define('MODEL_SHOP', MODULES_PATH . 'shop/model/model/');
    define('JS_VIEW_SHOP', SITE_PATH . 'module/shop/view/js/');
    define ('VIEW_PATH_SHOP', MODULES_PATH . 'shop/view/');

    // MODEL_SEARCH
    define('MODEL_SEARCH', MODULES_PATH . 'search/model/model/');
    define('DAO_SEARCH', MODULES_PATH . 'search/model/DAO/');
    define("BLL_SEARCH", MODULES_PATH . 'search/model/BLL');

    
    //MODEL_CONTACT
    define('MODEL_CONTACT', MODULES_PATH . 'contact/model/model/');
    define('JS_VIEW_CONTACT', SITE_PATH . 'module/contact/view/js/');
    define ('VIEW_PATH_CONTACT', MODULES_PATH . 'contact/view/');
    
    //MODEL_CART
    define('UTILS_CART', MODULES_PATH . 'cart/utils/');
    define('DAO_CART', MODULES_PATH . 'cart/model/DAO/');
    define('BLL_CART', MODULES_PATH . 'cart/model/BLL/');
    define('MODEL_CART', MODULES_PATH . 'cart/model/model/');
    define('JS_VIEW_CART', SITE_PATH . 'module/cart/view/js/');
    define ('VIEW_PATH_CART', MODULES_PATH . 'cart/view/');
    
    //MODEL_AUTH
    define('UTILS_AUTH', MODULES_PATH . 'auth/utils/');
    define('DAO_AUTH', MODULES_PATH . 'auth/model/DAO/');
    define('BLL_AUTH', MODULES_PATH . 'ogin/model/BLL/');
    define('MODEL_AUTH', MODULES_PATH . 'auth/model/model/');
    define('JS_VIEW_AUTH', SITE_PATH . 'modules/auth/view/js/');
    define ('VIEW_PATH_AUTH', MODULES_PATH . 'auth/view/');

    // Friendly
    define('URL_FRIENDLY', TRUE);
?>