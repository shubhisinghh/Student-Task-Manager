<?php
session_start();

// Redirect if not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "task_manager", 3307);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$success_message = '';
$error_message = '';

// When form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'];
    $title = trim($_POST['title']);
    $description = trim($_POST['description']);
    $due_date = $_POST['due_date'];
    $status = "Pending";
    $priority = $_POST['priority'];

    // Validate due date is not in the past
    $today = date("Y-m-d");
    if ($due_date < $today) {
        $error_message = "❌ Due date cannot be in the past";
    } else {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO tasks (user_id, title, description, due_date, status, priority) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssss", $user_id, $title, $description, $due_date, $status, $priority);

        if ($stmt->execute()) {
            $success_message = "✅ Task added successfully!";
            // Clear form fields if needed
            $title = $description = $due_date = '';
        } else {
            $error_message = "❌ Error: " . $conn->error;
        }
    }
}
