# 📚 Catatan Tugas Kuliah

Aplikasi web sederhana untuk mencatat dan mengelola tugas kuliah, dilengkapi dengan filter mata kuliah, sorting otomatis berdasarkan deadline, dan notifikasi visual untuk deadline yang mepet.

Dibuat sebagai project belajar mandiri untuk mempraktikkan konsep full-stack development dasar — mulai dari database, backend API, hingga frontend interaktif.

## ✨ Fitur

- **CRUD lengkap**: tambah, lihat, ubah status, dan hapus tugas
- **Filter mata kuliah**: menampilkan tugas berdasarkan mata kuliah tertentu, dropdown otomatis mengikuti data
- **Sorting otomatis**: tugas diurutkan berdasarkan deadline terdekat
- **Highlight deadline mepet**: tugas dengan deadline ≤ 2 hari ditandai warna merah dan label peringatan
- **Update via AJAX**: semua interaksi (tambah/update/hapus) berjalan tanpa reload halaman

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla, tanpa framework)
- **Backend**: PHP (native, tanpa framework)
- **Database**: MySQL
- **Tools**: Laragon (local server), DBeaver (database management), Thunder Client (API testing)

## 📸 Screenshot

![alt text](image.png)

## 🚀 Cara Menjalankan

1. Clone repository ini ke folder `www` Laragon (atau `htdocs` XAMPP):
```bash
   git clone https://github.com/nirwan-spec/catatan-tugas-kuliah.git
```

2. Buat database MySQL dengan nama `db_todo_kuliah`, lalu jalankan query berikut:
```sql
   CREATE TABLE tugas (
       id INT AUTO_INCREMENT PRIMARY KEY,
       judul VARCHAR(255) NOT NULL,
       mata_kuliah VARCHAR(100) NOT NULL,
       deadline DATE NOT NULL,
       status ENUM('belum', 'selesai') DEFAULT 'belum',
       dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
```

3. Sesuaikan kredensial database di `koneksi.php` jika diperlukan (default: `user: root`, `password: ""`)

4. Jalankan Apache dan MySQL di Laragon, lalu akses:

http://localhost:8080/catatan-tugas-kuliah/index.html

*(sesuaikan port dengan konfigurasi Laragon kamu)*

## 📁 Struktur Project

catatan-tugas-kuliah/
├── index.html # Halaman utama
├── style.css # Styling
├── script.js # Logika frontend & koneksi ke API
├── koneksi.php # Koneksi ke database
├── tambah_tugas.php # Endpoint Create
├── lihat_tugas.php # Endpoint Read
├── update_tugas.php # Endpoint Update
└── hapus_tugas.php # Endpoint Delete

## 📝 Catatan Pengembangan

Project ini dibuat dari nol sebagai latihan mandiri, bukan bagian dari tugas kuliah — tujuannya mempraktikkan konsep CRUD, koneksi database, dan integrasi frontend-backend secara langsung.

---

Dibuat oleh Nirwan — Mahasiswa Sistem Informasi, Telkom University