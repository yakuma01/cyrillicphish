<?php
$myValue = $_REQUEST["myValue"];
$response = "";
// Assign variables
$host    = "127.0.0.1";
$port    = 8877; //25003;
// Create socket
$socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");
// Connect to server
socket_connect($socket, $host, $port) or die("Could not connect to server\n"); 
// Read initial server response
$result = socket_read ($socket, 1024) or die("Could not read server response\n");
$response = "Initial Server Reply: " . $result . "<br/>";
// Assign a message/value to be sent to the server
$message = $myValue;
// Write the message to the server
socket_write($socket, $message, strlen($message)) or die("Could not send data to server\n");
// Read the server response
$result = socket_read ($socket, 1024) or die("Could not read server response\n");
$response = $response . "Server Reply: " . $result . "<br/>";
// Write string to terminate the exchange
$message = "quit";
socket_write($socket, $message, strlen($message)) or die("Could not send data to server\n");
// close socket
socket_close($socket);
echo $response;
?>