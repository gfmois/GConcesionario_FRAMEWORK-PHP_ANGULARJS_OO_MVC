<?php
    class ContactController {
        function sendContactMessage() {
            echo json_encode(Mailer::getInstance()->generateContactMail($_POST['name'], $_POST['email'], $_POST["text"], $_POST['theme']));
        }
    }

?>