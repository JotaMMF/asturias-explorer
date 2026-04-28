let places = [];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

// Load JSON data
fetch("places.json")
  .then(res => res.json())
  .then(data => {
    places = data;
    render(data);
  });

// Filters
search.addEventListener("input", applyFilters);
filter.addEventListener("change", applyFilters);

function applyFilters() {
  const term = search.value.toLowerCase();
  const type = filter.value;

  const filtered = places.filter(p => {
    const matchesText =
      p.name.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term);

    const matchesType = type === "all" || p.type === type;

    return matchesText && matchesType;
  });

  render(filtered);
}

// Render UI
function render(data) {
  grid.innerHTML = "";

  data.forEach(place => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${place.image}" alt="${place.name}">
      
      <div class="card-content">
        <h3>${place.name}</h3>
        <div class="location">📍 ${place.location}</div>

        <p>${place.description}</p>

        <div class="tags">
          ${place.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>

        <div class="note">⚠️ ${place.honesty_note}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}