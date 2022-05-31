<?php
$servername = "127.0.0.1";
#$servername = "localhost";
$username = "cognitive";
$password = "password";
//$dbname = "phishingsummer2019";
$dbname = "phishingsummer19";

$link = new mysqli($servername, $username, $password, $dbname,'3306');

if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
} 
//echo "Connected successfully <br>";
?>
