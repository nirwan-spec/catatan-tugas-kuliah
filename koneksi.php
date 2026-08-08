<?php
$host = "localhost";
$user = "root";
$pass = ""; // sesuaikan dengan password MySQL kamu
$db   = "db_todo_kuliah";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>