<?php
    require_once 'autoload.php';
    $_POST = json_decode(file_get_contents('php://input'), true);

    ob_start();
    session_start();

    class Router {
        private $uriModule;
        private $uriFunction;
        private $moduleName;
        static $_instance;

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        function __construct() {
            if (isset($_GET['page'])) $this->uriModule = $_GET['page'];
            else $this->uriModule = 'home';

            if (isset($_GET['op'])) $this->uriFunction = ($_GET['op'] == "") ? 'view' : $_GET['op'];
            else $this->uriFunction = 'view';
        }

        function routingStart() {
            try {                
                call_user_func(array($this->loadModule(), $this->loadFunction()));
            } catch (Exception $e) {
                common::loadError();
            }
        }

        private function loadModule() {
            clearstatcache();
            $xmlFile = 'resources/modules.xml';
            if (file_exists($xmlFile)) {
                $modules = simplexml_load_file($xmlFile);
                $resString = "";
                foreach ($modules as $module) {
                    if (in_array($this->uriModule, (Array) $module->uri)) {
                        for ($i = 0; $i < strlen($module->name); $i++) {
                            if ($i == 0) {
                                $resString = strtoupper(str_split($module->name)[0]);
                            } else {
                                $resString .= str_split($module->name)[$i];
                            }
                        }
                        $path = MODULES_PATH . $module->name . '/controller/' . $resString . 'Controller.class.php';
                        if (file_exists($path)){
                            require_once($path);
                            $controllerName =  (String) $resString . 'Controller';
                            $this->moduleName = (String) $module->name;
                            return new $controllerName;
                        }
                    } 
                }
            }

            throw new Exception('Not Module Found');
        }

        private function loadFunction() {
            $path = MODULES_PATH . $this->moduleName . '/resources/functions.xml';
            if (file_exists($path)) {
                $functions = simplexml_load_file($path);
                foreach ($functions as $function) {
                    if (in_array($this -> uriFunction, (Array) $function -> uri)) {
                        return (String) $function->name;
                    }
                }
            }
            
            throw new Exception('Not Function found.');
        }
    } 

    Router::getInstance()->routingStart();