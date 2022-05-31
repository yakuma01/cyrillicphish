<?php
require 'phpmailer/PHPMailerAutoload.php';
require_once 'includes/config.php';


function sendVerificationEmail($userEmail, $token)
{
    // Create the Mailer using your created Transport
    $mail = new PHPMailer;
    $mail->isSMTP();

    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 0;

    //Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';

    //Set the hostname of the mail server
    $mail->Host = 'smtp.gmail.com';

    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;

    //Set the encryption system to use - ssl (deprecated) or tls
    $mail->SMTPSecure = 'tls';

    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;

    //Username to use for SMTP authentication - use full email address for gmail
    $mail->Username = "iothouse33@gmail.com";

    //Password to use for SMTP authentication
    $mail->Password = 'iothouse_rock$?';

    $valid_email = "iothouse33@gmail.com";
    $valid_name = "CognitiveSecurity Admin";
    //Set who the message is to be sent from
    $mail->setFrom($valid_email, $valid_name);

    //Set an alternative reply-to address
    $mail->addReplyTo($valid_email, $valid_name);

    $protocol = isset($_SERVER['HTTPS']) ?'https://' : 'http://';
    $body = '<!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <title>Email Verification</title>
      <style>
        .wrapper {
          padding: 20px;
          color: #444;
          font-size: 1.3em;
        }
        a {
          background: #592f80;
          text-decoration: none;
          padding: 8px 15px;
          border-radius: 5px;
          color: #fff;
        }
      </style>
    </head>

    <body>
      <div class="wrapper">
        <p>Thank you for signing up on our site. Please click on the link below to verify your account:.</p>
        <a href="'.$protocol. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']).'/verify_email.php?token=' . $token . '">Verify Email!</a>
      </div>
    </body>

    </html>';

    //Set who the message is to be sent to
    //$mail->addAddress('dikim@indiana.edu', 'DongInn Kim');
    $mail->addAddress($userEmail, 'CognitiveSecurity User');

    //Set the subject line
    $mail->Subject = 'CognitiveSecurity User Verification';

    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    $mail->msgHTML($body);

    //Replace the plain text body with one created manually
    $mail->AltBody = 'This is a plain-text message body';


    //send the message, check for errors
    if (!$mail->send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
      echo("<script>alert(\"A server error occurred while sending your message.\"); window.location.href='index.php';</script>"  );
    } else {
      echo("<script>alert(\"Your verification email has been sent successfully\"); window.location.href='index.php';</script>
        <p> If the page does not redirect automatically, <a href=\"index.php\">click here</a></p>");
    }
}

function sendParticipantEmail($userEmail, $token)
{
    // Create the Mailer using your created Transport
    $mail = new PHPMailer;
    $mail->isSMTP();

    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 0;

    //Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';

    //Set the hostname of the mail server
    $mail->Host = 'smtp.gmail.com';

    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;

    //Set the encryption system to use - ssl (deprecated) or tls
    $mail->SMTPSecure = 'tls';

    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;

    //Username to use for SMTP authentication - use full email address for gmail
    $mail->Username = "iothouse33@gmail.com";

    //Password to use for SMTP authentication
    $mail->Password = 'iothouse_rock$?';

    $valid_email = "iothouse33@gmail.com";
    $valid_name = "CognitiveSecurity Admin";
    //Set who the message is to be sent from
    $mail->setFrom($valid_email, $valid_name);

    //Set an alternative reply-to address
    $mail->addReplyTo($valid_email, $valid_name);

    $protocol = isset($_SERVER['HTTPS']) ?'https://' : 'http://';
    $body = '<!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <title>Email Verification</title>
      <style>
        .wrapper {
          padding: 20px;
          color: #444;
          font-size: 1.3em;
        }
        a {
          background: #592f80;
          text-decoration: none;
          padding: 8px 15px;
          border-radius: 5px;
          color: #fff;
        }
      </style>
    </head>

    <body>
      <div class="wrapper">
        <p>Thank you for signing up on our site. Your participant code is valid. Please click on the link below to verify your account:.</p>
        <a href="'.$protocol. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']).'/verify_email.php?token=' . $token . '">Verify Email!</a>
      </div>
    </body>

    </html>';

    //Set who the message is to be sent to
    //$mail->addAddress('dikim@indiana.edu', 'DongInn Kim');
    $mail->addAddress($userEmail, 'CognitiveSecurity User');

    //Set the subject line
    $mail->Subject = 'CognitiveSecurity User Verification';

    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    $mail->msgHTML($body);

    //Replace the plain text body with one created manually
    $mail->AltBody = 'This is a plain-text message body';


    //send the message, check for errors
    if (!$mail->send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
      echo("<script>alert(\"A server error occurred while sending your message.\"); window.location.href='index.php';</script>"  );
    } else {
      echo("<script>alert(\"We confirm that your participant code is valid. Your verification email has been sent successfully\"); window.location.href='index.php';</script>
        <p> If the page does not redirect automatically, <a href=\"index.php\">click here</a></p>");
    }
}

function sendResetPasswordEmail($email, $key, $country, $token){
    $protocol = isset($_SERVER['HTTPS']) ?'https://' : 'http://';
    $output='<p>Dear user,</p>';
    $output.='<p>Please click on the following link to reset your password.</p>';
    $output.='<p>-------------------------------------------------------------</p>';
    $output.='<a href="'.$protocol. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']).'/verify_email.php?token=' . $token . '">Verify Email!</a>';
    $output.='<p><a href="'.$protocol. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']).'/reset-password.php?key='.$key.'&email='.$email.'&action=reset&country='. $country .'" target="_blank">
      '.$protocol. $_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']).'/reset-password.php?key='.$key.'&email='.$email.'&action=reset&country='.$country.'</a></p>'; 
    $output.='<p>-------------------------------------------------------------</p>';
    $output.='<p>Please be sure to copy the entire link into your browser.
      The link will expire after 1 day for security reason.</p>';
    $output.='<p>If you did not request this forgotten password email, no action 
      is needed, your password will not be reset. However, you may want to log into 
      your account and change your security password as someone may have guessed it.</p>';   
    $output.='<p>Thanks,</p>';
    $output.='<p>CognitiveSecurity Admin Team</p>';
    $body = $output; 
    $subject = "Password Recovery - global.cognitivesecurity.net";

    $email_to = $email;
    $fromserver = "www@cognitivesecurity.net"; 
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host = "smtp.gmail.com"; // Enter your host here
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = "iothouse33@gmail.com";
    $mail->Password = 'iothouse_rock$?';
    $mail->Port = 587;
    $mail->IsHTML(true);
    $mail->From = "www@cognitivesecurity.net";
    $mail->FromName = "CognitiveSecurity Admin";
    $mail->Sender = $fromserver; // indicates ReturnPath header
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AddAddress($email_to);
    if (!$mail->send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
      echo("<script>alert(\"A server error occurred while sending your message.\"); window.location.href='index.php';</script>"  );
    } else {
      echo("<script>alert(\"An email has been sent to you with instructions on how to reset your password.\"); window.location.href='index.php';</script>
        <p> If the page does not redirect automatically, <a href=\"index.php\">click here</a></p>");
    }
}
