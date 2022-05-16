<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;    

    require_once 'vendor/autoload.php';

    class Mailer {
        private $iniFile;
        static $_instance;

        private function __construct() {
            $this->iniFile = parse_ini_file('model/Config.ini', true);
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) self::$_instance = new self();
            return self::$_instance;
        }

        public function generateContactMail($name, $account, $text, $theme) {
            $mail = new PHPMailer(true);
    
            try {
                $mail->isSMTP();
                $mail->SMTPAuth     = true;
                $mail->SMTPSecure   = 'tls';
                $mail->Host         = $this->iniFile["SMTP"]["host"];
                $mail->Port         = 587;
                $mail->Username     = $this->iniFile["SMTP"]["username"];
                $mail->Password     = $this->iniFile["SMTP"]["password"];

                // Recipient
                $mail->setFrom($account, $name);
                $mail->addAddress($this->iniFile["SMTP"]["toAddress"], 'Contact Us');
                $mail->addReplyTo($account, $name);
                
                // Content
                $mail->isHTML(true);
                $mail->Subject      = $theme;
                $mail->Body         = $text;

                $mail->send();

                return [
                    "result" => [
                        "message" => "Mensaje enviado, revise el correo",
                        "code" => 200
                    ]
                ];
            } catch (Exception $e) {
                echo "Message could not be sent. Mail error: {$mail->ErrorInfo}";
            }
        }

        public function generateVerificationMail(String $name, String $account, String $link) {
            $mail = new PHPMailer(true);
    
            try {
                $mail->isSMTP();
                $mail->SMTPAuth     = true;
                $mail->SMTPSecure   = 'tls';
                $mail->Host         = $this->iniFile["SMTP"]["host"];
                $mail->Port         = 587;
                $mail->Username     = $this->iniFile["SMTP"]["username"];
                $mail->Password     = $this->iniFile["SMTP"]["password"];

                // Recipient
                $mail->setFrom("gconcesionario@no-reply.com", "Verification Link");
                $mail->addAddress($account, $name);
                // $mail->addReplyTo($account, $);
                
                // Content
                $mail->isHTML(true);
                $mail->Subject      = "Welcome to GConcesionario " . $name;
                $mail->Body         = "Click in this link to verificate the account: " . $link;

                $mail->send();

                return [
                    "result" => [
                        "message" => "Revise el correo para verificar la cuenta",
                        "code" => 200
                    ]
                ];
            } catch (Exception $e) {
                echo "Message could not be sent. Mail error: {$mail->ErrorInfo}";
            }
        }
    }

?>