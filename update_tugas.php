<?php
include 'koneksi.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $judul = $_POST['judul'];
    $mata_kuliah = $_POST['mata_kuliah'];
    $deadline = $_POST['deadline'];
    $status = $_POST['status'];

    $sql = "UPDATE tugas SET judul=?, mata_kuliah=?, deadline=?, status=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $judul, $mata_kuliah, $deadline, $status, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sukses", "pesan" => "Tugas berhasil diupdate"]);
    } else {
        echo json_encode(["status" => "gagal", "error" => $stmt->error]);
    }
}
?>