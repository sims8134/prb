<?php
$redirect = '/contact';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $redirect);
    exit;
}

if (!empty($_POST['website'] ?? '')) {
    header('Location: ' . $redirect . '?error=spam');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$subject || !$message) {
    header('Location: ' . $redirect . '?error=1');
    exit;
}

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$mail = new PHPMailer\PHPMailer\PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'mail.peoplesrepublicofbulgaria.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'contact@peoplesrepublicofbulgaria.com';
    $mail->Password = 'TON_VRAI_MOT_DE_PASSE';
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('contact@peoplesrepublicofbulgaria.com', "People's Republic of Bulgaria");
    $mail->addAddress('contact@peoplesrepublicofbulgaria.com');
    $mail->addReplyTo($email, $name);

    $mail->Subject = "[PRB] $subject — $name";
    $mail->Body =
        "You received a new message from your website.\n\n" .
        "Name: $name\n" .
        "Email: $email\n" .
        "Subject: $subject\n\n" .
        "Message:\n$message\n";

    $mail->send();

    header('Location: ' . $redirect . '?success=1');
    exit;
} catch (Exception $e) {
    header('Location: ' . $redirect . '?error=mail');
    exit;
}
?>