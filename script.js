const box = document.querySelector(".container");
const entry = document.querySelector(".input");
const find = document.querySelector(".button");
const url = "https://jsonfakery.com/movies/paginated?limit=10&page=";

let all = [];
let page = 1;
let loading = false;

async function fetchPage(num) {
  if (loading) return;
  loading = true;
  const res = await fetch(`${url}${num}`);
  const data = await res.json();
  const movies = data.data;
  if (num === 1) {
    all = movies;
    box.innerHTML = "";
  } else {
    all = all.concat(movies);
  }
  showMovies(movies);
  page = num;
  updateNav();
  loading = false;
}

function showMovies(list) {
  list.forEach(movie => {
    const card = document.createElement("div");
    card.style.border = "1px solid white";
    card.style.margin = "10px";
    card.style.padding = "10px";
    card.style.maxWidth = "300px";

    card.innerHTML = `
      <img src="${movie.poster_path}" style="margin-bottom: 10px; width: 100%;">
      <h3 style="margin-bottom: 10px;">${movie.original_title}</h3>
      <p style="margin-bottom: 10px;"><strong>Release:</strong> ${movie.release_date}</p>
      <p style="margin-bottom: 10px;">${movie.overview}</p>
      <p>${movie.vote_average}/10</p>
    `;
    box.appendChild(card);
  });
}
function searchMovies() {
  const term = entry.value.toLowerCase();
  const results = all.filter(movie =>
    movie.original_title.toLowerCase().includes(term)
  );
  box.innerHTML = "";
  showMovies(results);
}

fetchPage(page);