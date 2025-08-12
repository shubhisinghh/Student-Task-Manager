<?php
// Database connection settings
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "student_task_manager";
$port = 3307; // Change if needed

$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

