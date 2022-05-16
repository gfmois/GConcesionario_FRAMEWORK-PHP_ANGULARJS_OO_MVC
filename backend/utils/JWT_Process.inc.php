<?php
class JWT_Process {
    public static function encode($user) {
        $jwt = parse_ini_file(MODEL_PATH . "Config.ini", true);
        $header = '{"typ": ' . '"' . $jwt['Header']['typ'] . '", "alg": ' . '"' . $jwt['Header']["alg"] . '"}';
        $secret = $jwt["Secret"]['key'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60), 'name' => $user]);
        $JWT = JWT::getInstance();
        return $JWT->encode($header, $payload, $secret);
    }

    public static function decode($token) {
        $jwt = parse_ini_file(MODEL_PATH . "Config.ini");
        $JWT = JWT::getInstance();
        return $JWT->decode($token, $jwt['key']);
    }
}