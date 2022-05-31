<?php
    class AuthBLL {
        private $authDAO;
        private $db;
        private $mailer;
        private $jwt;
        private $parseIni;
        static $_instance;

        function __construct() {
            $this->mailer = Mailer::getInstance();
            $this->authDAO = AuthDAO::getInstance();
            $this->db = Connection::getInstance();
            $this->jwt = JWT::getInstance();
            $this->parseIni = parse_ini_file('model/Config.ini', true);
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function registerUserBLL($args) {
            $return = json_decode($this->authDAO->account_register($this->db, $args));

            if ($return->result->code == 23) {
                if ($return->result->social == false) $this->mailer->generateVerificationMail($args["username"], $args["email"], "http://localhost/GConcesionario_FRAMEWORK_ANGULARJS_OO_MVC/#/verify/" . $return->result->token);
                return [
                    "result" => [
                        "message" => $return->result->message,
                        "code" => $return->result->code
                    ]
                ];
            } else if ($return->result->code == 4) {
                return $return;
            }

            return [
                "result" => [
                    "message" => "Error al crear el usuario",
                    "code" => 404
                ]
            ];
        }

        public function loginUserBLL($args) {
            $res = $this->authDAO->account_login($this->db, $args);
            $stmt = $res != null ? get_object_vars($res) : [];
            
            if (empty($stmt)) return [
                "result" => [
                    "message" => "Usario no Existe",
                    "code" => 245 
                ]
            ];
            

            if (array_key_exists("social", $stmt) && $stmt["social"] == "1") {
                $social = true;
            } else {
                $social = password_verify($args["password"], $stmt["password"]);
            }

            if ($stmt != null && $social) {
                try {
                    $header = '{"typ": ' . '"' . $this->parseIni["Header"]["typ"] . '", "alg": ' . '"' . $this->parseIni["Header"]["alg"] . '"}';
                    $key = $this->parseIni['Secret']['key'];
                    $payload = '{"iat": ' . time() . ', "exp": ' . time() + (60 * 60) . ', "user": "' . $args['username'] . '"}';

                    $token = $this->jwt->encode($header, $payload, $key);

                    $_SESSION['user'] = $res->username;
                    $_SESSION['time'] = time();

                    return $token;
                } catch (Exception $e) {
                    return ["message" => [
                        "cod" => 601,
                        "commentary" => "Error en el JWT"
                    ]];
                }

            }

            return [
                "result" => [
                    "message" => "Contraseña o Usuario Incorrecto",
                    "code" => 246 
                ]
            ];
        } 

        public function verificationBLL($args) {
            return $this->authDAO->validateUser($this->db, $args);
        }

        public function checkTokenBLL($token) {
            $jwtUser = $this->jwt->decode($token, $this->parseIni["Secret"]["key"]);
            $json = json_decode($jwtUser, true);

            return $this->authDAO->findByUsername($this->db, $json["user"]);
        }

        public function logoutBLL($args) {
            if ($args != null) {
                session_destroy();
                session_unset();
                return json_encode(["result" => [
                    "code" => 22,
                    "message" => "Sesión Cerrada"
                ]]);
            } else {
                return [
                    "result" => [
                        "message" => "No Token",
                        "code" => 404
                    ]
                ];
            }
        }

        public function checkIfVerificated($args) {
            $isPasswordValid = password_verify($args["password"], $this->authDAO->getPassword($this->db, $args["username"]));

            if ($isPasswordValid) {
                $res = $this->authDAO->userVerificated($this->db, $args["username"])->verificated;
                if ($res != 0) {
                    return [
                        "result" => [
                            "message" => "Usuario verificado",
                            "code" => 1
                        ]
                    ];
                }
    
                return [
                    "result" => [
                        "message" => "Usuario no verificado, revise el correo.",
                        "code" => 845
                    ]];
                
            } 

            return [
                "result" => [
                    "message" => "Usuario o contraseña incorrecta.",
                    "code" => 351
                ]];

        }
    }
?>