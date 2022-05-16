<?php
    class common {
        public static function loadError() {
            require_once(VIEW_PATH_INC . 'top_page.html');
            require_once(VIEW_PATH_INC . 'header.html');
            require_once(VIEW_PATH_INC . 'menu.html');
            require_once(VIEW_PATH_INC . 'error404.html');
            require_once(VIEW_PATH_INC . 'footer.html');
        }

        public static function loadView($topPage, $view) {
            $topPage = VIEW_PATH_INC . $topPage;
            if ((file_exists($topPage)) && (file_exists($view))) {
                require_once ($topPage);
                require_once (VIEW_PATH_INC . 'header.html');
                require_once(VIEW_PATH_INC . 'menu.html');
                require_once ($view);
                require_once (VIEW_PATH_INC . 'footer.html');
            }else {
                self::loadError();
            }
        }

        public static function loadModel($model, $function = null, $args = null) {
            $dir = strToArray($model);
            $path = constant('MODEL_' . strtoupper($dir[1])) .  $model . '.class.singleton.php';
            if (file_exists($path)) {
                require_once ($path);
                if (method_exists($model, $function)) {
                    $obj = $model::getInstance();
                    if ($args != null) {
                        return call_user_func(array($obj, $function), $args);
                    }
                    return call_user_func(array($obj, $function));
                } else {
                    return "Error";
                }
            }
            throw new Exception();
        }

        public static function generate_token_secure($longitud){
            if ($longitud < 4) {
                $longitud = 4;
            }
            return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
        }
    }
?>