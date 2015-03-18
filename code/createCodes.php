<?php
/**
 * Created by PhpStorm.
 * User: jdinkelmann
 * Date: 3/2/15
 * Time: 7:48 PM
 */
ini_set('auto_detect_line_endings', true);
$file = fopen('medum.csv', 'r');
while (($line = fgetcsv($file)) !== FALSE) {
    //$line is an array of the csv elements
    //$name = $line[1];

    //$names = explode(' ',$name);
    $firstName = $line[0];
    $lastName = $line[1];
    $email = $line[2];
    $company = 'UMMED';
    $code = md5($email);

    print $firstName.",".$lastName.",".$email.",".$company.$code."<br>";
}
fclose($file);
