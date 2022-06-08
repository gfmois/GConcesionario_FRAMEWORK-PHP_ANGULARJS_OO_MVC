<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;    

    use \Mailjet\Resources;

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
            $mj = new \Mailjet\Client($this->iniFile["SMTP"]["API_KEY"],  $this->iniFile["SMTP"]["SECRET_KEY"], true, ['version' => 'v3.1']);
            $body = [
                'Messages' => [
                  [
                    'From' => [
                      'Email' => $account,
                      'Name' => $name
                    ],
                    'To' => [
                      [
                        'Email' => $this->iniFile["SMTP"]["toAddress"],
                        'Name' => $this->iniFile["SMTP"]["name"]
                      ]
                    ],
                    'Subject' => $theme,
                    'TextPart' => $text,
                    // 'HTMLPart' => "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                    // 'CustomID' => "AppGettingStartedTest"
                  ]
                ]
            ];
            $response = $mj->post(Resources::$Email, ['body' => $body]);
            $response->success() && var_dump($response->getData());
        }

        public function generateVerificationMail(String $name, String $account, String $link, String $subject = "Verificar cuenta", String $title = "Bienvenido a GConcesionario ") {
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
                $mail->setFrom("gconcesionario@no-reply.com", $subject);
                $mail->addAddress($account, $name);
                // $mail->addReplyTo($account, $);
                
                // Content
                $mail->isHTML(true);
                $mail->Subject      = $title . $name;
                $mail->Body         = "Pulse en este link para continuar: " . $link;

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