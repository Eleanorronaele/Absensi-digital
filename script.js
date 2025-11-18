let siswa = JSON.parse(localStorage.getItem("absensi")) || [];

function renderTabel() {
    const tbody = document.getElementById("tabelSiswa");
    tbody.innerHTML = "";

    siswa.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td><input type="checkbox" ${item.hadir ? "checked" : ""} 
                onclick="ubahStatus(${index})"></td>
            </tr>
        `;
    });
}

function tambahSiswa() {
    const nama = document.getElementById("namaSiswa").value;
    if (!nama) return alert("Nama tidak boleh kosong!");

    siswa.push({ nama: nama, hadir: false });
    document.getElementById("namaSiswa").value = "";
    renderTabel();
}

function ubahStatus(index) {
    siswa[index].hadir = !siswa[index].hadir;
}

function simpanData() {
    localStorage.setItem("absensi", JSON.stringify(siswa));
    alert("Data berhasil disimpan!");
}

function resetData() {
    if (confirm("Hapus semua data?")) {
        siswa = [];
        localStorage.removeItem("absensi");
        renderTabel();
    }
}

function downloadCSV() {
    let csv = "Nama,Hadir\n";
    siswa.forEach(s => {
        csv += `${s.nama},${s.hadir ? "Hadir" : "Tidak Hadir"}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "absensi.csv";
    link.click();
}

renderTabel();
