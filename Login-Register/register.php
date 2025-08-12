<?php
session_start();

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Redirect if not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Database connection with error handling
try {
    $conn = new mysqli("localhost", "root", "", "task_manager", 3307);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset to utf8mb4 for proper encoding
    $conn->set_charset("utf8mb4");
} catch (Exception $e) {
    die("Database connection error: " . $e->getMessage());
}

// Get user information
$user_id = $_SESSION['user_id'];
$user_name = $_SESSION['user_name'] ?? 'User'; // Fallback if name not set
$user_email = $_SESSION['user_email'] ?? ''; // Fallback if email not set

// Get user courses (with proper error handling)
$courses = [];
try {
    $course_sql = "SELECT id, course_code, course_name FROM user_courses WHERE user_id = ?";
    $course_stmt = $conn->prepare($course_sql);
    
    if ($course_stmt === false) {
        throw new Exception("Error preparing course statement: " . $conn->error);
    }
    
    $course_stmt->bind_param("i", $user_id);
    if (!$course_stmt->execute()) {
        throw new Exception("Error executing course statement: " . $course_stmt->error);
    }
    
    $course_result = $course_stmt->get_result();
    while ($row = $course_result->fetch_assoc()) {
        $courses[$row['id']] = $row;
    }
    $course_stmt->close();
} catch (Exception $e) {
    error_log("Error fetching courses: " . $e->getMessage());
}

// Mark as Completed
if (isset($_GET['complete'])) {
    try {
        $task_id = intval($_GET['complete']);
        $stmt = $conn->prepare("UPDATE tasks SET status = 'Completed', completed_at = NOW() WHERE id = ? AND user_id = ?");
        
        if ($stmt === false) {
            throw new Exception("Error preparing complete statement: " . $conn->error);
        }
        
        $stmt->bind_param("ii", $task_id, $user_id);
        if (!$stmt->execute()) {
            throw new Exception("Error executing complete statement: " . $stmt->error);
        }
        $stmt->close();
        header("Location: dashboard.php");
        exit();
    } catch (Exception $e) {
        die("Error completing task: " . $e->getMessage());
    }
}

// Get stats for dashboard cards
try {
    $stats_sql = "SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'Pending' AND due_date <= CURDATE() THEN 1 ELSE 0 END) as overdue,
        SUM(CASE WHEN priority = 'High' THEN 1 ELSE 0 END) as high_priority
        FROM tasks WHERE user_id = ?";
    
    $stats_stmt = $conn->prepare($stats_sql);
    
    if ($stats_stmt === false) {
        throw new Exception("Error preparing stats statement: " . $conn->error);
    }
    
    $stats_stmt->bind_param("i", $user_id);
    if (!$stats_stmt->execute()) {
        throw new Exception("Error executing stats statement: " . $stats_stmt->error);
    }
    
    $stats_result = $stats_stmt->get_result();
    $stats = $stats_result->fetch_assoc();
    $stats_stmt->close();
    
    // Ensure all stats have values even if NULL
    $stats = array_map(function($value) {
        return $value !== null ? $value : 0;
    }, $stats);
    
} catch (Exception $e) {
    // Don't die on stats error - just show zeros and continue
    $stats = [
        'total' => 0,
        'completed' => 0,
        'overdue' => 0,
        'high_priority' => 0
    ];
    error_log("Error getting stats: " . $e->getMessage());
}

// Rest of your code remains the same...
?>
