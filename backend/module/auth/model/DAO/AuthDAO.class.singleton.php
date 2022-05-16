<?php
    class AuthDAO {
        private $token;
        static $_instance;

        private function __construct() {
            $this->token = JWT::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        function account_register(Connection $db, $userInfo) {
            $sql = "SELECT * 
                    FROM users 
                    WHERE username 
                    LIKE " . "'" . $userInfo['username'] . "' 
                    OR email LIKE "  . "'" . $userInfo["email"] . "';";

                    
            $stmt = $db->select($sql);
            
            if (mysqli_num_rows($stmt)) {
                return json_encode([
                    "result" => [
                        "message" => "Nomber de Usuario o Email ya utilizado.",
                        "code" => 4
                    ]
                ]);
            } else {
                $social = false;

                if (array_key_exists("uuid", $userInfo)) {
                    $tokenUuid = $userInfo["uuid"];
                    $social = true;
                } else $tokenUuid = common::generate_token_secure(21);

                if (array_key_exists("password", $userInfo) && $userInfo["password"] == null) $passwd = null;
                else $passwd = password_hash($userInfo['password'], PASSWORD_DEFAULT, ["cost" => 12]);

                if (array_key_exists("verified", $userInfo) && $userInfo["verified"] == true) $verified = 1;
                else $verified = 0; 
                
                $tokenEmail = common::generate_token_secure(21);

                $query = "INSERT INTO users(uuid, verificated, username, password, email, token_email, avatar, social) 
                VALUES (" . "'" . $tokenUuid . "', " . $verified . ", '" . $userInfo['username'] . "', 
                '" . $passwd . 
                "', " . "'" . $userInfo['email'] . "', '" . $tokenEmail . "', '" . $userInfo['avatar'] . "', " . $social . ")";

                $stmt_register = $db->select($query);
                if ($stmt_register) {
                    if ($userInfo["uuid"]) $social = true; else $social = false;
                    return json_encode([
                        "result" => [
                            "message" => "Usuario creado correctamente",
                            "code" => 23,
                            "token" => $tokenEmail,
                            "social" => $social
                        ]
                    ]);
                } else {
                    return json_encode([
                        "result" => [
                            "message" => "Error al crear el usuario",
                            "code" => 56
                        ]
                    ]);
                }
            }
        } 

        public function account_login(Connection $db, $userInfo) {
            $sql = "SELECT * FROM users WHERE username LIKE BINARY " . "'" . $userInfo["username"] . "';";
            $res = $db->selectObject($sql);

            if (is_object($res)) $res->social = true;
            else if (is_array($res)) $res["social"] = true;  

            return $res;
        }

        public function validateUser(Connection $db, $emailToken) {
            $sql = "SELECT verificated FROM users WHERE token_email LIKE " . "'" . $emailToken . "'";
            
            $stmt = $db->select($sql);
            
            if (mysqli_num_rows($stmt) > 0) {
                if ($db->list($stmt)[0]["verificated"] == 0) {
                    $query = "UPDATE users SET verificated = 1 WHERE token_email LIKE " . "'" . $emailToken . "'";
                    $db->select($query);
    
                    return [
                        "result" => [
                            "message" => "Usuario verificado correctamente",
                            "code" => 823
                        ]
                    ];
                } else {
                    return [
                        "result" => [
                            "message" => "Usuario ya verificado",
                            "code" => 712
                        ]
                    ];
                }
            } else {
                return [
                    "result" => [
                        "message" => "Algo ha ido mal, porfavor solicite otro correo para verificar la cuenta.",
                        "code" => 322
                    ]
                ];
                
            }
        }

        public function findByUsername(Connection $db, $name) {
            $sql = "SELECT username, email, avatar, type FROM users WHERE username LIKE " . "'" . $name . "'";
            $res = $db->selectObject($sql);
            return get_object_vars($res);
        }

        public function userVerificated(Connection $db, $args) {
            $sql = "SELECT verificated FROM users WHERE username LIKE " . "'" . $args . "'";
            return $db->selectObject($sql);
        }

        public function getPassword(Connection $db, $args) {
            $sql = "SELECT password FROM users WHERE username LIKE " . "'" . $args . "'";
            return $db->list($db->select($sql))[0]["password"];
        }
    }
?>