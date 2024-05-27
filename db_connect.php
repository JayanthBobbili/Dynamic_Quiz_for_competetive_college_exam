<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
function getDbConnection() {
    $host = 'localhost';
    $port = '5432';
    $dbname = 'user_authentication';
    $user = 'postgres';
    $password = 'deen555904';

    $conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password";
    $dbconn = pg_connect($conn_string);
    if (!$dbconn) {
        die('Error connecting to database: ' . pg_last_error());
    }
    return $dbconn;
}
?>
