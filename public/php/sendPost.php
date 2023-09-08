<?php
    $name = trim(filter_var($_POST['name'], FILTER_SANITIZE_SPECIAL_CHARS));
    $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
    $message = trim(filter_var($_POST['message'], FILTER_SANITIZE_SPECIAL_CHARS));

    $error = '';

    if(strlen($name) < 2)
        $error = 'Имя слишком короткое (не менее 2 символов)';
    else if(strlen($email) < 5)
        $error = 'Email слишком короткий (не менее 3 символов)';
    else if(strlen($message) < 1)
        $error = 'Введите сообщение';
    
    if($error != '') {
        echo $error;
        exit();
    }

    // Отправка почты
    $to = 'ltvi.vadim@gmail.com';
    $subject = "=?utf-8?B?".base64_encode("Сообщение с сайта-портфолио")."?=";
    $message = "Имя: $name. Сообщение: $message";
    $headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";

    mail($to, $subject, $message, $headers);

    echo 'Done';