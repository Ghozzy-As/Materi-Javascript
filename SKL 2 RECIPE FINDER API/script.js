// ==========================================
// 1. KONSTANTA & SELEKTOR ELEMEN DOM
// ==========================================
const API_URL = 'https://dummyjson.com/recipes';

const favoriteBtn = document.getElementById('favorite-button');
const favoriteCount = document.getElementById('favorite-count');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const cuisineFilter = document.getElementById('cuisine-filter');
const difficultyFilter = document.getElementById('difficulty-filter');
const sectionTitle = document.getElementById('section-title');
const recipeCount = document.getElementById('recipe-count');
const resetFilterBtn = document.getElementById('reset-filter-button');

const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const recipeGrid = document.getElementById('recipe-grid');

const recipeDialog = document.getElementById('recipe-dialog');
const closeDialogBtn = document.getElementById('close-dialog');
const dialogContent = document.getElementById('dialog-content');

// ==========================================
// 2. STATE APLIKASI
// ==========================================
let allRecipes = [];
let favorites = JSON.parse(localStorage.getItem('recipe_favorites')) || [];
let isShowingFavoritesOnly = false;

// ==========================================
// 3. PENGELOLAAN LOCAL STORAGE & FAVORIT
// ==========================================
function updateFavoriteBadge() {
  favoriteCount.textContent = favorites.length;
}

function saveFavorites() {
  localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
  updateFavoriteBadge();
}

function toggleFavorite(id) {
  const recipeId = Number(id);
  const index = favorites.indexOf(recipeId);

  if (index === -1) {
    favorites.push(recipeId);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites();
  applyFiltersAndRender();
}

// ==========================================
// 4. FETCH DATA DARI API
// ==========================================
async function fetchRecipes() {
  showState('loading');
  try {
    const response = await fetch(`${API_URL}?limit=0`);
    if (!response.ok) throw new Error('Gagal mengambil data resep');

    const data = await response.json();
    allRecipes = data.recipes || [];

    populateCuisineFilter(allRecipes);
    updateFavoriteBadge();
    applyFiltersAndRender();
  } catch (error) {
    console.error('Fetch Error:', error);
    showState('error');
  }
}

// Mengisi dropdown kategori masakan secara dinamis dari data API
function populateCuisineFilter(recipes) {
  const cuisines = [...new Set(recipes.map((r) => r.cuisine))].sort();
  cuisines.forEach((cuisine) => {
    const option = document.createElement('option');
    option.value = cuisine;
    option.textContent = cuisine;
    cuisineFilter.appendChild(option);
  });
}

// ==========================================
// 5. LOGIKA FILTER & RENDERING
// ==========================================
function applyFiltersAndRender() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedCuisine = cuisineFilter.value;
  const selectedDifficulty = difficultyFilter.value;

  // Cek apakah ada filter/pencarian aktif untuk memunculkan tombol Reset
  const hasActiveFilter =
    query !== '' ||
    selectedCuisine !== '' ||
    selectedDifficulty !== '' ||
    isShowingFavoritesOnly;

  resetFilterBtn.hidden = !hasActiveFilter;

  // Proses penyaringan data
  const filtered = allRecipes.filter((recipe) => {
    if (isShowingFavoritesOnly && !favorites.includes(recipe.id)) {
      return false;
    }

    const matchesSearch =
      query === '' ||
      recipe.name.toLowerCase().includes(query) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(query));

    const matchesCuisine =
      selectedCuisine === '' || recipe.cuisine === selectedCuisine;

    const matchesDifficulty =
      selectedDifficulty === '' || recipe.difficulty === selectedDifficulty;

    return matchesSearch && matchesCuisine && matchesDifficulty;
  });

  // Pembaruan teks jumlah resep
  recipeCount.textContent = `${filtered.length} recipe${filtered.length === 1 ? '' : 's'}`;

  // Tampilkan state sesuai dengan hasil filter
  if (filtered.length === 0) {
    showState('empty');
  } else {
    showState('grid');
    renderRecipeCards(filtered);
  }
}

function renderRecipeCards(recipes) {
  recipeGrid.innerHTML = recipes
    .map((recipe) => {
      const isFav = favorites.includes(recipe.id);
      return `
        <article class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" loading="lazy">
          <div class="recipe-body">
            <span class="recipe-cuisine">${recipe.cuisine}</span>
            <h3 class="recipe-title">${recipe.name}</h3>
            <div class="recipe-meta">
              <span>⏱️ ${recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
              <span>⭐ ${recipe.rating}</span>
              <span>🔥 ${recipe.caloriesPerServing} kcal</span>
              <span>📊 ${recipe.difficulty}</span>
            </div>
            <div class="recipe-actions">
              <button class="detail-button" data-id="${recipe.id}">View Recipe</button>
              <button class="like-button" data-id="${recipe.id}" aria-label="Favorite">
                ${isFav ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

// ==========================================
// 6. MODAL DIALOG DETAIL RESEP
// ==========================================
function openRecipeModal(id) {
  const recipe = allRecipes.find((r) => r.id === Number(id));
  if (!recipe) return;

  dialogContent.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}" class="dialog-image">
    <div class="dialog-body">
      <h2>${recipe.name}</h2>
      <div class="dialog-meta">
        <span>🍳 ${recipe.cuisine}</span>
        <span>⏱️ Prep: ${recipe.prepTimeMinutes}m | Cook: ${recipe.cookTimeMinutes}m</span>
        <span>⭐ ${recipe.rating} (${recipe.reviewCount} reviews)</span>
        <span>🔥 ${recipe.caloriesPerServing} kcal</span>
        <span>📊 ${recipe.difficulty}</span>
      </div>
      <h3>Ingredients</h3>
      <ul class="ingredients">
        ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
      <h3>Instructions</h3>
      <div class="instructions">
        ${recipe.instructions.map((step) => `<p>${step}</p>`).join('')}
      </div>
    </div>
  `;

  if (typeof recipeDialog.showModal === 'function') {
    recipeDialog.showModal();
  }
}

// ==========================================
// 7. HELPER KONTROL STATE VISUAL
// ==========================================
function showState(state) {
  loadingState.hidden = state !== 'loading';
  errorState.hidden = state !== 'error';
  emptyState.hidden = state !== 'empty';
  recipeGrid.hidden = state !== 'grid';
}

function resetAllFilters() {
  searchInput.value = '';
  cuisineFilter.value = '';
  difficultyFilter.value = '';
  isShowingFavoritesOnly = false;
  sectionTitle.textContent = 'Explore Recipes';
  applyFiltersAndRender();
}

// ==========================================
// 8. EVENT LISTENERS
// ==========================================
// Pencarian & Filter
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  applyFiltersAndRender();
});
searchInput.addEventListener('input', applyFiltersAndRender);
cuisineFilter.addEventListener('change', applyFiltersAndRender);
difficultyFilter.addEventListener('change', applyFiltersAndRender);
resetFilterBtn.addEventListener('click', resetAllFilters);

// Tombol Favorit di Header (Toggle Filter Favorit)
favoriteBtn.addEventListener('click', () => {
  isShowingFavoritesOnly = !isShowingFavoritesOnly;
  sectionTitle.textContent = isShowingFavoritesOnly
    ? 'Favorite Recipes'
    : 'Explore Recipes';
  applyFiltersAndRender();
});

// Event Delegation untuk Kartu Resep (Tombol Detail & Suka)
recipeGrid.addEventListener('click', (e) => {
  const detailBtn = e.target.closest('.detail-button');
  if (detailBtn) {
    openRecipeModal(detailBtn.dataset.id);
    return;
  }

  const likeBtn = e.target.closest('.like-button');
  if (likeBtn) {
    toggleFavorite(likeBtn.dataset.id);
  }
});

// Penutupan Modal Dialog
closeDialogBtn.addEventListener('click', () => recipeDialog.close());

recipeDialog.addEventListener('click', (e) => {
  const rect = recipeDialog.getBoundingClientRect();
  const isOutside =
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom;

  if (isOutside) {
    recipeDialog.close();
  }
});

// ==========================================
// 9. INISIALISASI APLIKASI
// ==========================================
fetchRecipes();