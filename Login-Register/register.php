<?php
session_start();

// Database connection
$conn = new mysqli("localhost", "root", "", "task_manager", 3307);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$error = null;
$isLogin = isset($_GET['login']);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['register'])) {
        // Registration logic
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        
        // Validate inputs
        if (empty($email) || empty($password)) {
            $error = "All fields are required";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = "Invalid email format";
        } else {
            // Check if email exists
            $check_stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
            if ($check_stmt === false) {
                $error = "Database error: " . $conn->error;
            } else {
                $check_stmt->bind_param("s", $email);
                $check_stmt->execute();
                $check_stmt->store_result();
                
                if ($check_stmt->num_rows > 0) {
                    $error = "Email already exists";
                } else {
                    // Create new account
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                    $insert_stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
                    
                    if ($insert_stmt === false) {
                        $error = "Database error: " . $conn->error;
                    } else {
                        $insert_stmt->bind_param("ss", $email, $hashed_password);
                        
                        if ($insert_stmt->execute()) {
                            $_SESSION['user_id'] = $insert_stmt->insert_id;
                            $_SESSION['user_email'] = $email;
                            header("Location: dashboard.php");
                            exit();
                        } else {
                            $error = "Error creating account: " . $insert_stmt->error;
                        }
                        $insert_stmt->close();
                    }
                }
                $check_stmt->close();
            }
        }
    } elseif (isset($_POST['login'])) {
        // Login logic
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        
        if (empty($email) || empty($password)) {
            $error = "All fields are required";
        } else {
            $stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email = ?");
            if ($stmt === false) {
                $error = "Database error: " . $conn->error;
            } else {
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $result = $stmt->get_result();
                
                if ($result->num_rows === 1) {
                    $user = $result->fetch_assoc();
                    if (password_verify($password, $user['password'])) {
                        $_SESSION['user_id'] = $user['id'];
                        $_SESSION['user_email'] = $user['email'];
                        header("Location: dashboard.php");
                        exit();
                    } else {
                        $error = "Invalid email or password";
                    }
                } else {
                    $error = "Invalid email or password";
                }
                $stmt->close();
            }
        }
    }
}

$conn->close();
?>
