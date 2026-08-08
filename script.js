const API_URL = "http://localhost:8080/todo-kuliah";

// Ambil dan tampilkan semua tugas
function muatTugas() {
    fetch(`${API_URL}/lihat_tugas.php`)
        .then(res => res.json())
        .then(data => {
            const listDiv = document.getElementById("listTugas");
            listDiv.innerHTML = "";

            data.forEach(tugas => {
                const item = document.createElement("div");
                item.className = "tugas-item" + (tugas.status === "selesai" ? " selesai" : "");

                item.innerHTML = `
                    <div class="tugas-info">
                        <strong>${tugas.judul}</strong>
                        <span>${tugas.mata_kuliah} • Deadline: ${tugas.deadline}</span>
                    </div>
                    <div class="tugas-aksi">
                        ${tugas.status === "belum" 
                            ? `<button class="btn-selesai" onclick="tandaiSelesai(${tugas.id}, '${tugas.judul}', '${tugas.mata_kuliah}', '${tugas.deadline}')">Selesai</button>` 
                            : ""}
                        <button class="btn-hapus" onclick="hapusTugas(${tugas.id})">Hapus</button>
                    </div>
                `;

                listDiv.appendChild(item);
            });
        })
        .catch(err => console.error("Gagal memuat tugas:", err));
}

// Tambah tugas baru
document.getElementById("formTugas").addEventListener("submit", function(e) {
    e.preventDefault();

    const judul = document.getElementById("judul").value;
    const mata_kuliah = document.getElementById("mata_kuliah").value;
    const deadline = document.getElementById("deadline").value;

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("mata_kuliah", mata_kuliah);
    formData.append("deadline", deadline);

    fetch(`${API_URL}/tambah_tugas.php`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "sukses") {
            document.getElementById("formTugas").reset();
            muatTugas();
        } else {
            alert("Gagal menambah tugas: " + data.error);
        }
    })
    .catch(err => console.error("Gagal menambah tugas:", err));
});

// Tandai tugas selesai
function tandaiSelesai(id, judul, mata_kuliah, deadline) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("judul", judul);
    formData.append("mata_kuliah", mata_kuliah);
    formData.append("deadline", deadline);
    formData.append("status", "selesai");

    fetch(`${API_URL}/update_tugas.php`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "sukses") {
            muatTugas();
        } else {
            alert("Gagal update tugas: " + data.error);
        }
    })
    .catch(err => console.error("Gagal update tugas:", err));
}

// Hapus tugas
function hapusTugas(id) {
    if (!confirm("Yakin ingin menghapus tugas ini?")) return;

    const formData = new FormData();
    formData.append("id", id);

    fetch(`${API_URL}/hapus_tugas.php`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "sukses") {
            muatTugas();
        } else {
            alert("Gagal menghapus tugas: " + data.error);
        }
    })
    .catch(err => console.error("Gagal menghapus tugas:", err));
}

// Muat tugas saat halaman dibuka
let semuaTugas = []; // simpan data mentah biar bisa difilter tanpa fetch ulang

function muatTugas() {
    fetch(`${API_URL}/lihat_tugas.php`)
        .then(res => res.json())
        .then(data => {
            semuaTugas = data;
            perbaruiOpsiFilter(data);
            tampilkanTugas(data);
        })
        .catch(err => console.error("Gagal memuat tugas:", err));
}

function perbaruiOpsiFilter(data) {
    const select = document.getElementById("filterMataKuliah");
    const daftarMK = [...new Set(data.map(t => t.mata_kuliah))];
    const filterTerpilih = select.value;

    select.innerHTML = `<option value="semua">Semua Mata Kuliah</option>`;
    daftarMK.forEach(mk => {
        select.innerHTML += `<option value="${mk}">${mk}</option>`;
    });

    select.value = filterTerpilih || "semua";
}

function tampilkanTugas(data) {
    const filterAktif = document.getElementById("filterMataKuliah").value;
    const listDiv = document.getElementById("listTugas");
    listDiv.innerHTML = "";

    // Filter berdasarkan mata kuliah
    let dataTampil = filterAktif === "semua" 
        ? data 
        : data.filter(t => t.mata_kuliah === filterAktif);

    // Sorting berdasarkan deadline terdekat (ascending)
    dataTampil.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    dataTampil.forEach(tugas => {
        const hariTersisa = Math.ceil((new Date(tugas.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const deadlineDekat = hariTersisa <= 2 && hariTersisa >= 0 && tugas.status === "belum";

        const item = document.createElement("div");
        item.className = "tugas-item" 
            + (tugas.status === "selesai" ? " selesai" : "") 
            + (deadlineDekat ? " deadline-dekat" : "");

        item.innerHTML = `
            <div class="tugas-info">
                <strong>${tugas.judul}</strong>
                <span>${tugas.mata_kuliah} • Deadline: ${tugas.deadline}${deadlineDekat ? " ⚠️ Mepet!" : ""}</span>
            </div>
            <div class="tugas-aksi">
                ${tugas.status === "belum" 
                    ? `<button class="btn-selesai" onclick="tandaiSelesai(${tugas.id}, '${tugas.judul}', '${tugas.mata_kuliah}', '${tugas.deadline}')">Selesai</button>` 
                    : ""}
                <button class="btn-hapus" onclick="hapusTugas(${tugas.id})">Hapus</button>
            </div>
        `;

        listDiv.appendChild(item);
    });
}

// Panggil ulang tampilkanTugas() setiap kali filter berubah
document.getElementById("filterMataKuliah").addEventListener("change", () => {
    tampilkanTugas(semuaTugas);
});