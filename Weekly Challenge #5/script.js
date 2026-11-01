document.addEventListener("DOMContentLoaded", function () {
  // 1. Inisialisasi Tom Select untuk Kategori
  new TomSelect("#fKat", {
    plugins: ['remove_button'],
    persist: false,
    create: false
  });

  // 2. Inisialisasi Flatpickr untuk Rentang Tanggal
  flatpickr("#fDate", {
    mode: "range",
    dateFormat: "d M Y",
    defaultDate: ["2026-10-17", "2026-10-23"]
  });

  // 3. Inisialisasi Grafik Batang (Omzet per Hari)
  const ctxBar = document.getElementById('cBar').getContext('2d');
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Sab, 17', 'Min, 18', 'Sen, 19', 'Sel, 20', 'Rab, 21', 'Kam, 22', 'Jum, 23'],
      datasets: [{
        label: 'Omzet (Rp)',
        data: [220000, 150000, 210000, 220000, 190000, 150000, 270000],
        backgroundColor: '#1868DB',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });

  // 4. Inisialisasi Grafik Donat (Item per Kategori)
  const ctxDn = document.getElementById('cDn').getContext('2d');
  new Chart(ctxDn, {
    type: 'doughnut',
    data: {
      labels: ['Makanan', 'Minuman', 'Snack'],
      datasets: [{
        data: [140, 95, 26],
        backgroundColor: ['#1868DB', '#82B536', '#BF63F3']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // 5. Inisialisasi Tabel Produk menggunakan Tabulator
  const tableData = [
    { id: 1, produk: "Nasi Goreng", kategori: "MAKANAN", terjual: 38, omzet: "Rp380.000" },
    { id: 2, produk: "Mie Ayam", kategori: "MAKANAN", terjual: 23, omzet: "Rp184.000" },
    { id: 3, produk: "Nasi Uduk", kategori: "MAKANAN", terjual: 23, omzet: "Rp161.000" },
    { id: 4, produk: "Air Mineral", kategori: "MINUMAN", terjual: 34, omzet: "Rp136.000" },
    { id: 5, produk: "Es Teh Manis", kategori: "MINUMAN", terjual: 42, omzet: "Rp126.000" }
  ];

  new Tabulator("#tProd", {
    data: tableData,
    layout: "fitColumns",
    columns: [
      { title: "Produk", field: "produk", width: 130 },
      { title: "Kategori", field: "kategori", width: 100 },
      { title: "Terjual", field: "terjual", hozAlign: "center", width: 80 },
      { title: "Omzet", field: "omzet", hozAlign: "right" },
      {
        formatter: "buttonCross", width: 50, hozAlign: "center", cellClick: function(e, cell){
          Swal.fire({
            title: "Hapus Produk?",
            text: "Produk akan dihapus dari daftar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal"
          }).then((result) => {
            if (result.isConfirmed) {
              cell.getRow().delete();
              Swal.fire("Terhapus!", "Produk berhasil dihapus.", "success");
            }
          });
        }
      }
    ],
  });

  // 6. Interaksi Tombol Mode Gelap / Terang Sederhana
  const btnTheme = document.getElementById('btnTheme');
  btnTheme.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-color-mode');
    if (currentTheme === 'dark') {
      html.setAttribute('data-color-mode', 'light');
      btnTheme.textContent = '🌙 Mode Gelap';
    } else {
      html.setAttribute('data-color-mode', 'dark');
      btnTheme.textContent = '☀️ Mode Terang';
    }
  });
});