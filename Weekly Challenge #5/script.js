// === RIWAYAT TRANSAKSI HARIAN (MASTER TRANSAKSI BERDASARKAN TANGGAL) ===
let masterTransaksi = [
  // Tanggal 17 Okt 2026
  { date: "2026-10-17", prodId: 1, produk: "Nasi Goreng", kategori: "Makanan", harga: 10000, terjual: 6 },
  { date: "2026-10-17", prodId: 2, produk: "Mie Ayam", kategori: "Makanan", harga: 8000, terjual: 4 },
  { date: "2026-10-17", prodId: 4, produk: "Air Mineral", kategori: "Minuman", harga: 4000, terjual: 8 },
  { date: "2026-10-17", prodId: 5, produk: "Es Teh Manis", kategori: "Minuman", harga: 3000, terjual: 10 },
  { date: "2026-10-17", prodId: 6, produk: "Keripik Singkong", kategori: "Snack", harga: 3000, terjual: 6 },

  // Tanggal 18 Okt 2026
  { date: "2026-10-18", prodId: 1, produk: "Nasi Goreng", kategori: "Makanan", harga: 10000, terjual: 4 },
  { date: "2026-10-18", prodId: 3, produk: "Nasi Uduk", kategori: "Makanan", harga: 7000, terjual: 5 },
  { date: "2026-10-18", prodId: 4, produk: "Air Mineral", kategori: "Minuman", harga: 4000, terjual: 5 },
  { date: "2026-10-18", prodId: 5, produk: "Es Teh Manis", kategori: "Minuman", harga: 3000, terjual: 5 },
  { date: "2026-10-18", prodId: 6, produk: "Keripik Singkong", kategori: "Snack", harga: 3000, terjual: 4 },

  // Tanggal 19 Okt 2026
  { date: "2026-10-19", prodId: 1, produk: "Nasi Goreng", kategori: "Makanan", harga: 10000, terjual: 7 },
  { date: "2026-10-19", prodId: 2, produk: "Mie Ayam", kategori: "Makanan", harga: 8000, terjual: 5 },
  { date: "2026-10-19", prodId: 3, produk: "Nasi Uduk", kategori: "Makanan", harga: 7000, terjual: 4 },
  { date: "2026-10-19", prodId: 4, produk: "Air Mineral", kategori: "Minuman", harga: 4000, terjual: 4 },
  { date: "2026-10-19", prodId: 5, produk: "Es Teh Manis", kategori: "Minuman", harga: 3000, terjual: 6 },

  // Tanggal 20 Okt 2026
  { date: "2026-10-20", prodId: 1, produk: "Nasi Goreng", kategori: "Makanan", harga: 10000, terjual: 8 },
  { date: "2026-10-20", prodId: 2, produk: "Mie Ayam", kategori: "Makanan", harga: 8000, terjual: 5 },
  { date: "2026-10-20", prodId: 3, produk: "Nasi Uduk", kategori: "Makanan", harga: 7000, terjual: 4 },
  { date: "2026-10-20", prodId: 5, produk: "Es Teh Manis", kategori: "Minuman", harga: 3000, terjual: 6 },
  { date: "2026-10-20", prodId: 6, produk: "Keripik Singkong", kategori: "Snack", harga: 3000, terjual: 4 },

  // Tanggal 21 Okt 2026
  { date: "2026-10-21", prodId: 1, produk: "Nasi Goreng", kategori: "Makanan", harga: 10000, terjual: 5 },
  { date: "2026-10-21", prodId: 3, produk: "Nasi Uduk", kategori: "Makanan", harga: 7000, terjual: 6 },
  { date: "2026-10-21", prodId: 4, produk: "Air Mineral", kategori: "Minuman", harga: 4000, terjual: 7 },
  { date: "2026-10-21", prodId: 5, produk: "Es Teh Manis", kategori: "Minuman", harga: 3000, terjual: 5 },
  { date: "2026-10-21", prodId: 6, produk: "Keripik Singkong", kategori: "Snack", harga: 3000, terjual: 5 },

  // Tanggal 22 Okt 2026
  { date: "2026-10-22", prodId: 2, produk: "Mie Ayam", kategori: "Makanan", harga: 8000, terjual: 4 },
  { date: "2026-10-22", prodId: 3, produk: "Nasi Uduk", kategori: "Makanan", harga: 7000, terjual: 4 },
  { date: "2026-10-22", prodId: 4, produk: "Air Mineral", kategori: "Minuman", harga: 4000, terjual: 5 },
  { date: "2026-10-22", prodId: 5, produk: "Es Teh Manis", kategori: "Minuman", harga: 3000, terjual: 5 },
  { date: "2026-10-22", prodId: 6, produk: "Keripik Singkong", kategori: "Snack", harga: 3000, terjual: 3 },

  // Tanggal 23 Okt 2026
  { date: "2026-10-23", prodId: 1, produk: "Nasi Goreng", kategori: "Makanan", harga: 10000, terjual: 8 },
  { date: "2026-10-23", prodId: 2, produk: "Mie Ayam", kategori: "Makanan", harga: 8000, terjual: 5 },
  { date: "2026-10-23", prodId: 4, produk: "Air Mineral", kategori: "Minuman", harga: 4000, terjual: 5 },
  { date: "2026-10-23", prodId: 5, produk: "Es Teh Manis", kategori: "Minuman", harga: 3000, terjual: 5 },
  { date: "2026-10-23", prodId: 6, produk: "Keripik Singkong", kategori: "Snack", harga: 3000, terjual: 4 }
];

const MASTER_PROMO = [
  { id: 1, title: "Senin Hemat", sub: "Mie Ayam cuma Rp7.000", badge: "Senin", cls: "blue", emoji: "🍱", kategori: "Makanan" },
  { id: 2, title: "Paket Sarapan", sub: "Nasi Uduk + Es Teh Rp9.000", badge: "Setiap Hari", cls: "yellow", emoji: "🍳", kategori: "Makanan" },
  { id: 3, title: "Menu Baru", sub: "Pisang Goreng Coklat", badge: "Minggu Ini", cls: "teal", emoji: "🍫", kategori: "Snack" },
  { id: 4, title: "Jumat Berkah", sub: "Air mineral gratis tiap beli makanan", badge: "Jumat", cls: "red", emoji: "💧", kategori: "Minuman" }
];

let selectedDateRange = ["2026-10-17", "2026-10-23"];
let tabulatorTable = null;
let chartBar = null;
let chartDn = null;
let tomSelectInstance = null;

document.addEventListener("DOMContentLoaded", function () {
  // 1. Inisialisasi Flatpickr
  flatpickr("#fDate", {
    mode: "range",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d M Y",
    defaultDate: ["2026-10-17", "2026-10-23"],
    locale: "id",
    onChange: function (selectedDates, dateStr) {
      if (selectedDates.length === 2) {
        selectedDateRange = [
          formatDateISO(selectedDates[0]),
          formatDateISO(selectedDates[1])
        ];
        updateDashboard();
      }
    }
  });

  // 2. Inisialisasi Tabulator Table
  tabulatorTable = new Tabulator("#tProd", {
    data: [],
    layout: "fitColumns",
    placeholder: "Silakan pilih kategori di atas untuk melihat data produk.",
    columns: [
      { title: "Produk", field: "produk", width: 130 },
      { 
        title: "Kategori", 
        field: "kategori", 
        formatter: function(cell){
          let cat = cell.getValue();
          let cls = cat === 'Makanan' ? 'blue' : (cat === 'Minuman' ? 'green' : 'purple');
          return `<span class="lozenge ${cls}">${cat.toUpperCase()}</span>`;
        }
      },
      { title: "Terjual", field: "terjual", hozAlign: "center", width: 80 },
      { title: "Omzet", field: "omzet", hozAlign: "right" },
      { 
        formatter: function() { return "🗑️"; }, 
        width: 50, 
        hozAlign: "center", 
        cellClick: function(e, cell){
          let rowData = cell.getRow().getData();
          Swal.fire({
            title: "Hapus Produk?",
            text: `Hapus "${rowData.produk}" dari riwayat transaksi?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: '#C9372C'
          }).then((result) => {
            if (result.isConfirmed) {
              // Hapus semua baris transaksi produk ini yang berada dalam rentang tanggal & kategori
              masterTransaksi = masterTransaksi.filter(t => !(t.prodId === rowData.prodId));
              updateDashboard();
              Swal.fire({ title: "Terhapus!", text: "Produk berhasil dihapus.", icon: "success", timer: 1200, showConfirmButton: false });
            }
          });
        }
      }
    ],
  });

  // 3. Inisialisasi Chart.js Bar Chart
  const ctxBar = document.getElementById('cBar').getContext('2d');
  chartBar = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{ data: [], backgroundColor: '#357DE8', borderRadius: 4 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { ticks: { callback: v => (v >= 1000 ? (v/1000) + 'rb' : v) } } }
    }
  });

  // 4. Inisialisasi Chart.js Donut Chart
  const ctxDn = document.getElementById('cDn').getContext('2d');
  chartDn = new Chart(ctxDn, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{ data: [], backgroundColor: ['#357DE8', '#82B536', '#BF63F3'], borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });

  // 5. Inisialisasi Tom Select (KOSONG DI AWAL)
  tomSelectInstance = new TomSelect("#fKat", {
    plugins: ['remove_button'],
    options: [
      { value: 'Makanan', text: 'Makanan' },
      { value: 'Minuman', text: 'Minuman' },
      { value: 'Snack', text: 'Snack' }
    ],
    items: [], // Kosong di awal
    onChange: function() {
      updateDashboard();
    }
  });

  updateDashboard();

  // 6. Tombol Toggle Dark Mode
  document.getElementById('btnTheme').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-color-mode') === 'dark';
    html.setAttribute('data-color-mode', isDark ? 'light' : 'dark');
    document.getElementById('themeLabel').innerText = isDark ? 'Mode gelap' : 'Mode terang';
  });
});

// === FUNGSI SINKRONISASI REAL-TIME (TANGGAL & KATEGORI) ===
function updateDashboard() {
  const categories = tomSelectInstance ? tomSelectInstance.getValue() : [];
  const isEmp = !categories || categories.length === 0;

  const [startDateStr, endDateStr] = selectedDateRange;

  // Filter master data transaksi berdasarkan Rentang Tanggal & Kategori
  const filteredTrx = masterTransaksi.filter(t => {
    const matchDate = t.date >= startDateStr && t.date <= endDateStr;
    const matchCat = categories.includes(t.kategori);
    return matchDate && matchCat;
  });

  // Rekapitulasi per Produk untuk Tabel Tabulator
  const productSummaryMap = {};
  filteredTrx.forEach(t => {
    if (!productSummaryMap[t.prodId]) {
      productSummaryMap[t.prodId] = {
        prodId: t.prodId,
        produk: t.produk,
        kategori: t.kategori,
        terjual: 0,
        omzetVal: 0
      };
    }
    productSummaryMap[t.prodId].terjual += t.terjual;
    productSummaryMap[t.prodId].omzetVal += (t.terjual * t.harga);
  });

  const tableData = Object.values(productSummaryMap).map(p => ({
    ...p,
    omzet: "Rp" + p.omzetVal.toLocaleString('id-ID')
  }));

  const filteredPromo = MASTER_PROMO.filter(p => categories.includes(p.kategori));

  // Hitung jumlah hari aktif dalam rentang
  const daysList = getDatesInRange(startDateStr, endDateStr);
  const totalDays = Math.max(1, daysList.length);

  // Update Header Sub-Title
  document.getElementById('subInfo').innerText = isEmp
    ? "Pilih kategori untuk menampilkan data"
    : `${formatDateDisplay(startDateStr)} - ${formatDateDisplay(endDateStr)} · ${categories.length} kategori · ${tableData.length} produk`;

  // 1. Update KPI Card
  if (isEmp) {
    document.getElementById('kOmzet').innerText = "-";
    document.getElementById('cOmzet').innerText = "";
    document.getElementById('kItem').innerText = "-";
    document.getElementById('cItem').innerText = "";
    document.getElementById('kTrx').innerText = "-";
    document.getElementById('cTrx').innerText = "";
  } else {
    const totalOmzet = filteredTrx.reduce((sum, t) => sum + (t.terjual * t.harga), 0);
    const totalItem = filteredTrx.reduce((sum, t) => sum + t.terjual, 0);
    const avgOmzet = Math.round(totalOmzet / totalDays);

    document.getElementById('kOmzet').innerText = "Rp" + totalOmzet.toLocaleString('id-ID');
    document.getElementById('cOmzet').innerText = `Rata-rata Rp${avgOmzet.toLocaleString('id-ID')} per hari`;
    document.getElementById('kItem').innerText = totalItem;
    document.getElementById('cItem').innerText = `Dari ${tableData.length} produk yang laku`;
    document.getElementById('kTrx').innerText = filteredTrx.length;
    document.getElementById('cTrx').innerText = `Dalam ${totalDays} hari`;
  }

  // 2. Update Tabulator Table
  tabulatorTable.setData(tableData);
  document.getElementById('prodCount').innerText = `${tableData.length} produk`;

  // 3. Update Grafik Batang (Omzet Per Hari Sesuai Tanggal Terpilih)
  const dailyOmzetMap = {};
  daysList.forEach(d => dailyOmzetMap[d] = 0);

  filteredTrx.forEach(t => {
    if (dailyOmzetMap[t.date] !== undefined) {
      dailyOmzetMap[t.date] += (t.terjual * t.harga);
    }
  });

  chartBar.data.labels = daysList.map(d => formatDateLabel(d));
  chartBar.data.datasets[0].data = daysList.map(d => dailyOmzetMap[d]);
  chartBar.update();

  // 4. Update Grafik Donat (Item per Kategori)
  let catLabels = [];
  let catCounts = [];
  categories.forEach(cat => {
    const totalCatItem = filteredTrx
      .filter(t => t.kategori === cat)
      .reduce((sum, t) => sum + t.terjual, 0);
    catLabels.push(cat);
    catCounts.push(totalCatItem);
  });
  chartDn.data.labels = catLabels;
  chartDn.data.datasets[0].data = catCounts;
  chartDn.update();

  // 5. Update Promo List
  const promoContainer = document.getElementById('promoList');
  promoContainer.innerHTML = "";
  document.getElementById('promoCount').innerText = `${filteredPromo.length} aktif`;

  if (filteredPromo.length === 0) {
    promoContainer.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ds-text-subtlest); font-style:italic;">Tidak ada promo aktif untuk kategori ini.</div>`;
  } else {
    filteredPromo.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="p-emoji">${p.emoji}</div>
        <div class="p-body"><b>${p.title}</b><small>${p.sub}</small></div>
        <span class="lozenge ${p.cls}">${p.badge}</span>
      `;
      promoContainer.appendChild(li);
    });
  }
}

// === FUNGSI BANTUAN TANGGAL ===
function formatDateISO(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDatesInRange(startStr, endStr) {
  const dates = [];
  let curr = new Date(startStr);
  const end = new Date(endStr);
  while (curr <= end) {
    dates.push(formatDateISO(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr);
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  return `${days[d.getDay()]}, ${d.getDate()}`;
}

function formatDateDisplay(dateStr) {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}