<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $phone_number = $_POST['phone_number'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($first_name) || empty($last_name) || empty($phone_number) || empty($email) || empty($password)) {
        echo 'Please fill in all required fields.';
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $dbconn = getDbConnection();

    $result = pg_query_params($dbconn, 'SELECT * FROM users WHERE email = $1', array($email));
    if (!$result) {
        echo 'Database query failed: ' . pg_last_error();
        exit();
    }

    if (pg_num_rows($result) > 0) {
        pg_close($dbconn);
        echo 'User already exists';
        exit();
    } else {
        $query = 'INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES ($1, $2, $3, $4, $5)';
        $result = pg_query_params($dbconn, $query, array($first_name, $last_name, $phone_number, $email, $hashed_password));
        if (!$result) {
            echo 'Database query failed: ' . pg_last_error();
            exit();
        }
        pg_close($dbconn);
        echo 'Account created successfully';
        exit();
    }
}
?>

