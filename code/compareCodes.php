<?php
/**
 * Created by PhpStorm.
 * User: jdinkelmann
 * Date: 3/13/15
 * Time: 9:15 AM
 */
ini_set('auto_detect_line_endings', true);
$file = fopen('ford.txt', 'r');
$usedCodes = fopen('used_codes.csv', 'r');

while (($line = fgetcsv($file)) !== FALSE) {

}