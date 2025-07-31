// ✅ Your OMDB API key
const API_KEY = "5342d2e1";

// ✅ Get DOM elements
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

// ✅ Listen for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page reload

    const title = input.value.trim(); // Get input text
    if (!title) return;

    // ✅ API URL with exact title search
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;

    // ✅ Fetch movie data
    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Network response failed");
            return response.json();
        })
        .then((data) => {
            resultsContainer.innerHTML = "";

            if (data.Response === "True") {
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
                resultsContainer.innerHTML = movieHTML;
            } else {
                resultsContainer.innerHTML = `<p class="error">Movie not found 😢</p>`;
            }
        })
        .catch((err) => {
            console.error("Fetch error:", err);
            resultsContainer.innerHTML = `<p class="error">Something went wrong. Try again later.</p>`;
        });
});
