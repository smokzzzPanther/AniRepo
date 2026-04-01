# 🎬 Movie Explorer

**A vanilla JavaScript web application for searching, filtering, and sorting movies using the public OMDb API.**

This project was built to demonstrate proficiency in API integration, DOM manipulation, and the use of JavaScript Array Higher-Order Functions (HOFs) such as `map()`, `filter()`, and `sort()`, completely without the use of traditional `for` or `while` loops.

---

## 🚀 Features

- **Real-Time Search:** Search for movies, series, or video games using the OMDb API.
- **Filtering (`Array.prototype.filter`):** Filter search results by specific media types (Movies, Series, Episodes).
- **Sorting (`Array.prototype.sort`):** Sort the results chronologically (Newest First, Oldest First).
- **Dynamic Rendering (`Array.prototype.map`):** Automatically map data objects to HTML strings for clean rendering.
- **Favorites (Local Storage):** Save your favorite results to your browser's local storage. Clicking the "Save" button toggles the state dynamically.
- **Dark Mode Toggle:** Smooth transition between light and dark themes, with user preference saved in local storage.
- **Loading States:** Displays a smooth CSS spinner while fetching data to improve user experience.
- **Responsive Design:** Fully responsive CSS Grid layout that adapts gracefully to mobile, tablet, and desktop screens.

---

## 🛠️ Technologies Used

- **HTML5:** Semantic HTML structure.
- **CSS3:** Custom styling (no external CSS frameworks like Bootstrap/Tailwind), CSS Variables for theming, and CSS Grid/Flexbox for layout.
- **JavaScript (ES6+):** Vanilla JS for all logic:
  - `fetch()` with `async/await` for API calls.
  - Array HOFs (`map`, `filter`, `sort`, `includes`).
  - Web Storage API (`localStorage`) for data persistence.
- **[OMDb API](https://www.omdbapi.com/):** The Open Movie Database API used to fetch real movie data.

---

## 📦 How to Run

Because this project uses raw HTML, CSS, and JS with no build steps, it is extremely easy to run:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd movie-explorer
   ```

2. **Open the App:**
   - You can simply double-click the `index.html` file to open it in your default web browser.
   - Alternatively, for a better development experience, use the **Live Server** extension in VS Code.

3. *(Optional)* **Add Your Own API Key:**
   By default, this project attempts to use a public OMDb test key. In `app.js`, you can replace `const PUBLIC_OMDB_KEY = '72a6b22b';` with your own free key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx) if requests fail due to rate limits.

---

## 📝 Milestone Requirements Checklist

✅ **Milestone 1:** Project chosen (Movie Explorer), API chosen (OMDb API), Repository and README created.
✅ **Milestone 2:** `fetch` implemented, data displayed dynamically, loading/error states handled, responsive UI.
✅ **Milestone 3:** Search implemented, Filtering implemented, Sorting implemented, Dark Mode toggle implemented. **Crucially, all array operations use HOFs (`map`, `filter`, `sort`) and zero loops are used.**
✅ **Milestone 4:** Clean codebase, fully documented README, ready for deployment.

---

## ⭐ Bonus Features Implemented

- **Local Storage:** Used for saving the User's Dark/Light Theme preference as well as saving "Favorite" movies.
- **Loading Indicators:** A visual CSS spinner provides feedback during network requests.

---

### License
This project is for educational use. The data and images are provided by the OMDb API.
