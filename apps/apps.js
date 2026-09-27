let globalData = [];
const board = document.getElementById('dashboard-board');
const navArea = document.getElementById('navigation-area');
const btnBack = document.getElementById('btn-back');
const catTitle = document.getElementById('current-category-title');

// 1. Ambil data dari file JSON luar
async function initDashboard() {
    try {
        const response = await fetch('projects.json');
        globalData = await response.json();
        tampilkanKategori();
    } catch (error) {
        board.innerHTML = `<p style="color: red;">Gagal memuat data proyek: ${error.message}</p>`;
    }
}

// 2. Fungsi memunculkan halaman menu Kategori Utama
function tampilkanKategori() {
    navArea.classList.add('hidden');
    board.innerHTML = '';

    globalData.forEach((kategori, index) => {
        const cardKategori = document.createElement('div');
        cardKategori.className = 'card';
        cardKategori.innerHTML = `
            <div>
                <div class="card-icon">${kategori.icon || '📁'}</div>
                <h3>${kategori.nama_kategori}</h3>
                <p>${kategori.deskripsi}</p>
            </div>
            <span class="btn-primary" style="text-align:center; font-size: 0.85rem;">Buka Kategori</span>
        `;
        // Jika kartu kategori diklik, ganti tampilan ke daftar proyek di dalamnya
        cardKategori.addEventListener('click', () => tampilkanDetailProyek(index));
        board.appendChild(cardKategori);
    });
}

// 3. Fungsi memunculkan sub-menu daftar aplikasi di dalam kategori pilihan
function tampilkanDetailProyek(indexKategori) {
    const dataPilihan = globalData[indexKategori];
    catTitle.innerText = dataPilihan.nama_kategori;
    navArea.classList.remove('hidden');
    board.innerHTML = '';

    if (dataPilihan.projek_list.length === 0) {
        board.innerHTML = '<p style="color: var(--text-muted);">Belum ada aplikasi di kategori ini.</p>';
        return;
    }

    dataPilihan.projek_list.forEach(projek => {
        const cardProjek = document.createElement('div');
        cardProjek.className = 'card';
        cardProjek.innerHTML = `
            <div>
                <h3>${projek.nama}</h3>
                <p>${projek.deskripsi || 'Tidak ada deskripsi proyek.'}</p>
            </div>
            <a href="${projek.url}" target="_blank" class="btn-primary">Jalankan Aplikasi 🚀</a>
        `;
        board.appendChild(cardProjek);
    });
}

// Event Listener tombol kembali
btnBack.addEventListener('click', tampilkanKategori);

// Jalankan aplikasi pertama kali saat halaman dimuat
document.addEventListener('DOMContentLoaded', initDashboard);
