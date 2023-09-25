<?php
$servername = 'localhost:3306';
$username = 'agchr';
$password = 'abc123';
$dbname = 'demmacsdb';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['Email'];
    $password = $_POST['Password'];

    $passhash = md5($password);

    $stmt = $conn->prepare("SELECT * FROM login WHERE Email = ? AND Password = ?");
    $stmt->bind_param("ss", $email, $passhash);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if ($row['Admin'] == 1) {
            $_SESSION['Email'] = $row['Email'];
            // Return a JSON response indicating success and admin status
            echo json_encode(["success" => true, "isAdmin" => true]);
            exit();
        } else {
            // Return a JSON response indicating success (not admin)
            echo json_encode(["success" => true, "isAdmin" => false]);
            exit();
        }
    } else {
        // Return a JSON response indicating failure
        echo json_encode(["success" => false]);
        exit();
    }

    $stmt->close();
}
$conn->close();
?>
