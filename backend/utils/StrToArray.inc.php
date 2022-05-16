<?php
function strToArray($string) {
    $stringArray = array();
    $wordLimit = "";

    if (count_capitals($string) > 1) {
        for ($i = 0; $i < strlen($string); $i++) {
            if (ctype_upper($string[$i]) && $i != 0) {
                $wordLimit = substr($string, $i, 99);
                break;
            }
        }
        
        for ($i = 0; $i < strlen($string); $i++) {
            if (ctype_upper($string[$i]) && $i == 0) {
                $stringArray[1] =  substr($string, $i, strpos($string, $wordLimit));
            } else if (ctype_upper($string[$i]) && $i != 0) {
                $stringArray[0] =  substr($string, $i, 99);
                break;
            }
        }

        return $stringArray;
    }

    return $string;

}

function count_capitals($s) {
    return mb_strlen(preg_replace('![^A-Z]+!', '', $s));
}
?>