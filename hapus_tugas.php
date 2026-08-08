<?php
include 'koneksi.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];

    $sql = "DELETE FROM tugas WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sukses", "pesan" => "Tugas berhasil dihapus"]);
    } else {
        echo json_encode(["status" => "gagal", "error" => $stmt->error]);
    }
}
?>