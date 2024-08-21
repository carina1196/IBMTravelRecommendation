//define variables
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("searchResult");

var searchOutput = [];
var temples = [];
var beaches = [];
var countriesData = [];
var listOfCountries = [];

//fetch api to fetch data
fetch("./travel_recommendation_api.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    temples = data["temples"];
    beaches = data["beaches"];
    countriesData = data["countries"];

    countriesData.forEach((country) => {
      listOfCountries.push(country["name"].toLowerCase());
    });
  })
  .catch((error) => {
    console.error("An error occured:", error);
    result.innerHTML = `<p class="alert alert-warning">An error has occurred</p>`;
  });

function keywordSearch() {
  searchOutput = [];
  const search = document.getElementById("searchInput").value;

  if (["beach", "beaches", "BEACH", "BEACHES"].includes(search)) {
    searchOutput = beaches;
  } else if (["temple", "temples", "TEMPLE", "TEMPLES"].includes(search)) {
    searchOutput = temples;
  } else if (listOfCountries.includes(search.toLowerCase())) {
    countriesData.forEach((country) => {
      if (search.toLowerCase() === country["name"].toLowerCase()) {
        searchOutput = country["cities"];
      }
    });
  } else {
    result.innerHTML = `<p>No results found</p>`;
  }
}

function search() {
  result.innerHTML = "";
  keywordSearch();

  searchOutput.forEach((data) => {
    const card = `<div class="card mb-3 mr-2" >
  <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">${data.description}</p>
    <a href="" class="btn btn-primary">Visit</a>
  </div>
</div>`;
    result.innerHTML += card;
  });
}

function clear() {
  result.innerHTML = "";
  document.getElementById("searchInput").value = "";
}

searchBtn.addEventListener("click", search);
resetBtn.addEventListener("click", clear);
