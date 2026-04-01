/* ==================================
   Movie Explorer - Plain JavaScript
   ================================== */

// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieGrid = document.getElementById('movie-grid');
const loadingIndicator = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const filtersContainer = document.getElementById('filters-container');
const typeFilter = document.getElementById('type-filter');
const yearSort = document.getElementById('year-sort');
const themeToggleBtn = document.getElementById('theme-toggle');

// OMDb API Key (free tier API key for demo)
const API_KEY = 'YOUR_OMDB_API_KEY'; // Note: students usually register their own, we'll use a placeholder or public one if needed, but OMDb requires one.
// Let's use a known public key for teaching, or just placeholder. Let's use 'tt3896198' standard format. 'apikey=72a6b22b' is a commonly shared public test key, but it's best to handle errors if it fails.
const PUBLIC_OMDB_KEY = '72a6b22b'; 

// State Management
let moviesData = []; // To store fetched movies
let favorites = JSON.parse(localStorage.getItem('savedFavorites')) || [];

/* ==================================
   Initialization
   ================================== */
function init() {
  // Load Theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  // Event Listeners
  searchForm.addEventListener('submit', handleSearch);
  typeFilter.addEventListener('change', applyFiltersAndSort);
  yearSort.addEventListener('change', applyFiltersAndSort);
  themeToggleBtn.addEventListener('click', toggleTheme);
}

/* ==================================
   Theme Toggle
   ================================== */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

/* ==================================
   API Integration (Fetch)
   ================================== */
async function fetchMovies(query) {
  showLoading();
  
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${PUBLIC_OMDB_KEY}&s=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.Response === 'True') {
      moviesData = data.Search; // Store raw data
      filtersContainer.style.display = 'flex'; // Show filters
      applyFiltersAndSort(); // Render with default filters
    } else {
      showError(data.Error || 'No results found.');
      moviesData = [];
      filtersContainer.style.display = 'none';
    }

  } catch (error) {
    showError('Failed to fetch data. Please check your connection.');
    console.error('API Error:', error);
  }
}

/* ==================================
   Event Handlers
   ================================== */
function handleSearch(e) {
  e.preventDefault(); // Prevent page reload
  const query = searchInput.value.trim();
  
  if (query) {
    fetchMovies(query);
  }
}

/* ==================================
   Higher-Order Functions (HOFs)
   ================================== */
function applyFiltersAndSort() {
  const typeValue = typeFilter.value;
  const sortValue = yearSort.value;

  // 1. FILTERING (using Array.prototype.filter)
  let processedData = moviesData.filter((movie) => {
    if (typeValue === 'all') return true;
    return movie.Type === typeValue;
  });

  // 2. SORTING (using Array.prototype.sort)
  if (sortValue !== 'default') {
    // Note: create a copy so we don't mutate the filtered array in-place unpredictably
    processedData = [...processedData].sort((a, b) => {
      // Parse years (handle cases like "2005–" series)
      const yearA = parseInt(a.Year);
      const yearB = parseInt(b.Year);
      
      if (sortValue === 'newest') {
        return yearB - yearA; // Descending
      } else if (sortValue === 'oldest') {
        return yearA - yearB; // Ascending
      }
      return 0;
    });
  }

  // Render the processed data
  renderMovies(processedData);
}

/* ==================================
   Rendering (Map HOF)
   ================================== */
function renderMovies(movies) {
  hideLoading();
  movieGrid.innerHTML = ''; // Clear grid

  if (movies.length === 0) {
    showError('No movies match your filters.');
    return;
  }

  // 3. MAPPING (using Array.prototype.map) to create HTML strings
  const cardsHTML = movies.map((movie) => {
    // Fallback for missing posters
    const posterSrc = movie.Poster !== 'N/A' 
      ? movie.Poster 
      : 'https://via.placeholder.com/300x450?text=No+Poster';
      
    const isFav = favorites.includes(movie.imdbID);

    return `
      <div class="movie-card">
        <img src="${posterSrc}" alt="${movie.Title}" class="card-poster" loading="lazy">
        <div class="card-body">
          <h3 class="card-title">${movie.Title}</h3>
          <div class="card-meta">
            <span>📅 ${movie.Year}</span>
            <span class="type-badge">${movie.Type}</span>
          </div>
          
          <!-- Interactive Button (Like/Favorite) -->
          <button 
            class="favorite-btn ${isFav ? 'active' : ''}" 
            onclick="toggleFavorite('${movie.imdbID}')"
            id="fav-btn-${movie.imdbID}"
          >
            ${isFav ? '❤️ Saved' : '🤍 Save'}
          </button>
        </div>
      </div>
    `;
  }).join(''); // join array of strings into one big HTML string

  movieGrid.innerHTML = cardsHTML;
}

/* ==================================
   Interactive Feature: Favorites
   ================================== */
function toggleFavorite(imdbID) {
  const btn = document.getElementById(`fav-btn-${imdbID}`);
  
  if (favorites.includes(imdbID)) {
    // Remove from favorites (using filter HOF!)
    favorites = favorites.filter(id => id !== imdbID);
    btn.classList.remove('active');
    btn.innerHTML = '🤍 Save';
  } else {
    // Add to favorites
    favorites.push(imdbID);
    btn.classList.add('active');
    btn.innerHTML = '❤️ Saved';
  }
  
  // Save to LocalStorage
  localStorage.setItem('savedFavorites', JSON.stringify(favorites));
}

/* ==================================
   UI State Helpers
   ================================== */
function showLoading() {
  movieGrid.innerHTML = '';
  errorMessage.classList.add('hidden');
  loadingIndicator.classList.remove('hidden');
}

function hideLoading() {
  loadingIndicator.classList.add('hidden');
}

function showError(msg) {
  hideLoading();
  errorMessage.classList.remove('hidden');
  errorText.textContent = msg;
}

// Boot the app
init();
