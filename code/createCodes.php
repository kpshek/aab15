<?php
/**
 * Created by PhpStorm.
 * User: jdinkelmann
 * Date: 3/2/15
 * Time: 7:48 PM
 */
ini_set('auto_detect_line_endings', true);
$file = fopen('aaaAttendees.csv', 'r');
while (($line = fgetcsv($file)) !== FALSE) {
    //$line is an array of the csv elements
    $name = $line[0];

    //$names = explode(' ',$name);
    //$firstName = $line[0];
    //$lastName = $line[1];
    //$email = $line[2];
    //$company = 'UMMED';
    $link = "https://aab2015.eventbrite.com/?discount=AAA".md5($name);
    $code = "AAA".md5($name);

    print $name.",".$link.",".$code."<br>";
}
fclose($file);
