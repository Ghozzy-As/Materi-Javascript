const API_URL = 'https://dummyjson.com/products';

// Element Selectors
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const errorMessage = document.getElementById('error-message');
const emptyState = document.getElementById('empty-state');
const productGrid = document.getElementById('product-grid');
const resultSummary = document.getElementById('result-summary');
const categorySelect = document.getElementById('category-select');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');
const resetBtn = document.getElementById('reset-btn');
const reloadBtn = document.getElementById('reload-btn');
const retryBtn = document.getElementById('retry-btn');

// Dialog Elements
const productDialog = document.getElementById('product-dialog');
const dialogContent = document.getElementById('dialog-content');
const dialogClose = document.getElementById('dialog-close');

// Global State
let allProducts = [];

/**
 * 1. Mengambil semua data produk dari API
 */
async function fetchProducts() {
  showState('loading');
  try {
    // Mengambil seluruh produk (limit=0 untuk mengambil semua data dummy)
    const response = await fetch(`${API_URL}?limit=0`);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const data = await response.json();
    allProducts = data.products || [];
    
    applyFiltersAndRender();
  } catch (error) {
    console.error('Fetch error:', error);
    if (errorMessage) {
      errorMessage.textContent = 'Gagal mengambil data dari server. Periksa koneksi internet Anda.';
    }
    showState('error');
  }
}

/**
 * 2. Mengambil daftar kategori dari API untuk mengisi dropdown
 */
async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) return;
    
    const categories = await response.json();
    
    categorySelect.innerHTML = '<option value="all">Semua kategori</option>';
    
    categories.forEach((item) => {
      // API dummyjson mengembalikan array object { slug, name }
      const slug = typeof item === 'string' ? item : item.slug;
      const name = typeof item === 'string' ? item : item.name;
      
      categorySelect.innerHTML += `
        <option value="${slug}">${name}</option>
      `;
    });
  } catch (error) {
    console.error('Gagal memuat kategori:', error);
  }
}

/**
 * 3. Logika Memfilter, Mencari, dan Mengurutkan Data Produk
 */
function applyFiltersAndRender() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;
  const sortValue = sortSelect.value;

  // Filter gabungan (Pencarian & Kategori)
  let filtered = allProducts.filter((product) => {
    const matchesSearch =
      query === '' ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      (product.brand && product.brand.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  filtered.sort((a, b) => {
    switch (sortValue) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      default:
        return a.id - b.id;
    }
  });

  // Tampilkan UI berdasarkan hasil filter
  if (filtered.length === 0) {
    showState('empty');
    resultSummary.textContent = 'Menampilkan 0 produk';
  } else {
    showState('grid');
    resultSummary.textContent = `Menampilkan ${filtered.length} dari ${allProducts.length} produk`;
    renderProductCards(filtered);
  }
}

/**
 * 4. Render Kartu Produk ke DOM
 */
function renderProductCards(products) {
  productGrid.innerHTML = products
    .map((product) => {
      const { id, title, price, category, thumbnail, rating } = product;
      return `
        <article class="product-card">
          <div class="product-image-wrap">
            <img class="product-image" src="${thumbnail}" alt="${title}" loading="lazy">
          </div>

          <div class="product-body">
            <span class="product-category">
              ${category}
            </span>

            <h3 class="product-title">
              ${title}
            </h3>

            <div class="product-meta">
              <span class="product-price">
                $${price}
              </span>

              <span class="product-rating">
                ⭐ ${rating}
              </span>
            </div>

            <button type="button" class="detail-btn" data-id="${id}">
              Lihat Detail
            </button>
          </div>
        </article>
      `;
    })
    .join('');
}

/**
 * 5. Mengatur Tampilan State (Loading, Error, Empty, Grid)
 */
function showState(state) {
  loadingState.hidden = state !== 'loading';
  errorState.hidden = state !== 'error';
  emptyState.hidden = state !== 'empty';
  productGrid.hidden = state !== 'grid';
}

/**
 * 6. Pop-up Modal Detail Produk
 */
function openDetailModal(productId) {
  const product = allProducts.find((p) => p.id === Number(productId));
  if (!product) return;

  const { title, description, price, rating, stock, brand, category, thumbnail } = product;

  // Format HTML Modal Detail sesuai kelas CSS yang ada pada style.css
  dialogContent.innerHTML = `
    <div class="dialog-detail">
      <img class="dialog-image" src="${thumbnail}" alt="${title}">
      <div class="dialog-copy">
        <span class="product-category">${category}</span>
        <h2>${title}</h2>
        <p>${description}</p>
        
        <div class="detail-list">
          <div class="detail-row">
            <span>💰 Harga</span>
            <strong>$${price}</strong>
          </div>
          <div class="detail-row">
            <span>⭐ Rating</span>
            <strong>${rating}</strong>
          </div>
          <div class="detail-row">
            <span>📦 Stock</span>
            <strong>${stock ?? 'Tidak tersedia'}</strong>
          </div>
          <div class="detail-row">
            <span>🏷️ Brand</span>
            <strong>${brand || 'Tanpa Brand'}</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  if (typeof productDialog.showModal === 'function') {
    productDialog.showModal();
  }
}

// =========================================================
// EVENT LISTENERS
// =========================================================

// Event Delegation untuk tombol "Lihat Detail"
productGrid.addEventListener('click', (e) => {
  const detailBtn = e.target.closest('.detail-btn');
  if (detailBtn) {
    const id = detailBtn.dataset.id;
    openDetailModal(id);
  }
});

// Tutup dialog saat tombol close diklik
dialogClose.addEventListener('click', () => {
  productDialog.close();
});

// Tutup dialog saat klik di luar area modal (backdrop)
productDialog.addEventListener('click', (e) => {
  const rect = productDialog.getBoundingClientRect();
  const isInDialog =
    rect.top <= e.clientY &&
    e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX &&
    e.clientX <= rect.left + rect.width;

  if (!isInDialog) {
    productDialog.close();
  }
});

// Event listener filter, search & sort
searchInput.addEventListener('input', applyFiltersAndRender);
categorySelect.addEventListener('change', applyFiltersAndRender);
sortSelect.addEventListener('change', applyFiltersAndRender);

// Tombol Reset Filter
resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  categorySelect.value = 'all';
  sortSelect.value = 'default';
  applyFiltersAndRender();
});

// Tombol Reload Data & Coba Lagi
if (reloadBtn) reloadBtn.addEventListener('click', fetchProducts);
if (retryBtn) retryBtn.addEventListener('click', fetchProducts);

// Inisialisasi awal
fetchCategories();
fetchProducts();