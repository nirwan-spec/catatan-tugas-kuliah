<?php
include 'koneksi.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $judul = $_POST['judul'];
    $mata_kuliah = $_POST['mata_kuliah'];
    $deadline = $_POST['deadline'];

    $sql = "INSERT INTO tugas (judul, mata_kuliah, deadline) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $judul, $mata_kuliah, $deadline);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sukses"]);
    } else {
        echo json_encode(["status" => "gagal", "error" => $stmt->error]);
    }
}
?>