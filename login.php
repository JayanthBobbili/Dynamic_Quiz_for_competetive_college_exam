<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo 'Please fill in all required fields.';
        exit();
    }

    $dbconn = getDbConnection();

    $result = pg_query_params($dbconn, 'SELECT * FROM users WHERE email = $1', array($email));
    if (!$result) {
        echo 'Database query failed: ' . pg_last_error();
        exit();
    }

    if (pg_num_rows($result) == 0) {
        pg_close($dbconn);
        echo 'User does not exist';
        exit();
    } else {
        $row = pg_fetch_assoc($result);
        if (password_verify($password, $row['password'])) {
            pg_close($dbconn);
            echo 'Login successful';
            exit();
        } else {
            pg_close($dbconn);
            echo 'Incorrect password';
            exit();
        }
    }
}
?>

