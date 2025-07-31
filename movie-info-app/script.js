// ✅ Your OMDB API key
const API_KEY = "5342d2e1";

// ✅ Get DOM elements
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

// ✅ Listen for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the page from reloading

    const title = input.value.trim(); // Get text from input
    if (!title) return; // If input is empty, exit

    // ✅ Build the API URL using ?t= for exact title search
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;

    // ✅ Fetch data from OMDB API
    fetch(url)
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            // ✅ Clear previous results
            resultsContainer.innerHTML = "";

            // ✅ If movie found
            if (data.Response === "True") {
                // Create movie card HTML
                const movieHTML = `
                    <div class="movie-card">
                        <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${data.Title}" />
                        <div class="movie-info">
                            <h2>${data.Title} (${data.Year})</h2>
                            <p><strong>Genre:</strong> ${data.Genre}</p>
                            <p><strong>IMDb:</strong> ⭐ ${data.imdbRating}</p>
                            <p><strong>Plot:</strong> ${data.Plot}</p>
                        </div>
                    </div>
                `;

                // ✅ Inject the movie HTML into the results container
                resultsContainer.innerHTML = movieHTML;

            } else {
                // ✅ If movie not found or invalid title
                resultsContainer.innerHTML = `<p class="error">Movie not found 😢</p>`;
            }
        })
        .catch(err => {
            // ✅ If fetch fails (e.g., no internet or API down)
            console.error("Fetch error:", err);
            resultsContainer.innerHTML = `<p class="error">Something went wrong. Try again later.</p>`;
        });
});
