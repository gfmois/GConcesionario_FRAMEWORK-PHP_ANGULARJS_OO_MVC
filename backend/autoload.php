<?php
    require_once 'paths.php';
    require_once 'utils/StrToArray.inc.php';

    spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');
    spl_autoload_register('loadClasses');

    function loadClasses($module) {
        $breakClass = strToArray($module);
        $modelName = "";

        if (isset($breakClass[0]) && is_array($breakClass)) {
            $modelName = strtoupper($breakClass[0]);
        }

        $realBreakClass = strtolower(!is_array($breakClass) ? $breakClass : $breakClass[1]);
        
        if (file_exists(SITE_ROOT . 'module/' . $realBreakClass . '/model/'. $modelName . '/' . $module . '.class.singleton.php')) {
            set_include_path('module/' . $realBreakClass . '/model/' . $modelName.'/');
            spl_autoload($module);
            require_once SITE_ROOT . 'module/' . $realBreakClass . '/model/'. $modelName . '/' . $module . '.class.singleton.php';
        } else if (file_exists(SITE_ROOT . 'model/' . $module . '.class.singleton.php')){
            set_include_path(SITE_ROOT . 'model/');
            spl_autoload($module);
            require_once SITE_ROOT . 'model/' . $module . '.class.singleton.php';
        } else if (file_exists(SITE_ROOT . 'model/' . $module . '.class.php')){
            set_include_path(SITE_ROOT . 'model/');
            spl_autoload($module);
        } else if (file_exists(SITE_ROOT . 'utils/' . $module . '.inc.php')) {
            set_include_path(SITE_ROOT . 'utils/');
            spl_autoload($module);
            require_once SITE_ROOT . 'utils/' . $module . '.inc.php';
        }
    }
?>