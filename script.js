const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const ALL_POKEMON_URL =
  "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

const MORE_POKEMONS = document.getElementById("more_pokemons");
const DIALOG = document.getElementById("dialog");
const INPUT = document.getElementById("pokemon_search");

let pokemonCount = 0;
let maxPokemons;
let nextPokemons;
let previousPokemons;
let limit = 25;
let offset = 0;

let searchPokemons = [];

INPUT.onkeyup = searchPokemon;

DIALOG.onclick = (event) => {
  if (event.target === DIALOG) {
    closeDialog();
  }
};

function init() {
  getPokemons(BASE_URL + "?limit=" + limit + "&offset=" + offset);
  INPUT.value = "";
}

async function searchPokemon() {
  let name = INPUT.value.trim();
  searchPokemons = [];
  if (name === "") {
    init();
  } else {
    let allPokemons = await fetchUrl(ALL_POKEMON_URL);
    for (let i = 0; i < allPokemons.results.length; i++) {
      if (allPokemons.results[i].name.startsWith(name)) {
        searchPokemons.push(allPokemons.results[i]);
      }
    }
    searchPokemons.sort(sortAlphabetical(searchPokemons));
    renderPokemons(searchPokemons);
  }
}

async function getAllPokemons() {
  let responseJson = await fetchUrl(ALL_POKEMON_URL);
  let allPokemons = [];
  for (let i = 0; i < responseJson.results; i++) {
    let species = await fetchUrl(responseJson.results[i].url);
    allPokemons.push(species);
  }

  renderPokemons(allPokemons);
}

async function getPokemons(url) {
  let pokemons = await fetchUrl(url);
  nextPokemons = pokemons.next;
  previousPokemons = pokemons.previous;
  maxPokemons = pokemons.count;

  renderPokemons(pokemons.results);
}

async function getSinglePokemon(id) {
  let pokemon = await fetchUrl(BASE_URL + id);

  return pokemon;
}

async function renderPokemons(pokemons) {
  let pokemonContent = document.getElementById("content");
  pokemonContent.innerHTML = "";
  let length = pokemons.length;
  if (length > limit) {
    length = limit;
  }

  for (let i = 0; i < length; i++) {
    let pokemon = await fetchUrl(pokemons[i].url);
    let types = await getPokemonTypes(pokemon.types);
    let species = await getSpecies(pokemon.species.url);

    pokemonContent.innerHTML += getPokemonOverviewTemplate(
      pokemon,
      types,
      species,
    );
  }
}

async function renderSinglePokemon(id) {
  let pokemon = await getSinglePokemon(id);
  let stats = getStats(pokemon.stats);
  let species = await getSpecies(pokemon.species.url);
  let types = await getPokemonTypes(pokemon.types);
  let sound = await getSounds(id);

  DIALOG.innerHTML = getSinglePokemonTemplate(
    pokemon,
    stats,
    species,
    types,
    sound,
  );
}

function getStats(stats) {
  let string = "";
  for (let i = 0; i < stats.length; i++) {
    string += getPokemonTypesTemplate(stats[i]);
  }
  return string;
}

async function getPokemonTypes(pokemonTypes) {
  let imgString = "";
  for (let i = 0; i < pokemonTypes.length; i++) {
    let typeImg = await fetchUrl(pokemonTypes[i].type.url);
    imgString += `
    <img src="${
      typeImg.sprites?.["generation-viii"]?.["legends-arceus"]?.name_icon ||
      typeImg.sprites?.["generation-iii"]?.["colosseum"]?.name_icon
    }" class="type_image" />
    `;
  }
  return imgString;
}

async function getSpecies(url) {
  let species = await fetchUrl(url);

  return species;
}

async function getSounds(name) {
  let json = await fetchUrl(BASE_URL + name);
  return json.cries.latest;
}

async function playSound(file) {
  let audio = new Audio(file);
  audio.play().catch((error) => {
    if (error.name !== "AbortError") {
      console.error(error);
    }
  });
}

function getNextPokemons() {
  if (pokemonCount + limit > maxPokemons) {
    return;
  } else {
    pokemonCount = pokemonCount + limit;
    getPokemons(nextPokemons);
  }
}

function getPrevPokemons() {
  if (pokemonCount - limit < 0) {
    return;
  } else {
    pokemonCount = pokemonCount - limit;
    getPokemons(previousPokemons);
  }
  console.log(pokemonCount);
}

async function fetchUrl(url) {
  let response = await fetch(url);
  let responseToJson = await response.json();
  return responseToJson;
}

function onClickDialog() {}

function toggleDialog() {
  DIALOG.classList.toggle("open");
  document.body.classList.toggle("no_scroll");
}

function openDialog(id) {
  DIALOG.showModal();
  renderSinglePokemon(id);
  toggleDialog();
}

function closeDialog() {
  DIALOG.close();
  toggleDialog();
}

function sortAlphabetical(array) {
  array.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}
