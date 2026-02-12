const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const ALL_POKEMON_URL =
  "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

const DIALOG = document.getElementById("dialog");
const INPUT = document.getElementById("pokemon_search");
const MORE_POKEMONS = document.getElementById("more_pokemons");
const LESS_POKEMONS = document.getElementById("less_pokemons");

let pokemonCount = 0;
let maxPokemons;
let nextPokemons;
let previousPokemons;
let limit = 10;
let start = 0;
let end = limit;

let allPokemons = [];
let searchPokemons = [];
let renderedPokemons = [];

INPUT.onkeyup = searchPokemon;

MORE_POKEMONS.onclick = getNextPokemons;

LESS_POKEMONS.onclick = getPrevPokemons;

DIALOG.onclick = (event) => {
  if (event.target === DIALOG) {
    closeDialog();
  }
};

function init() {
  getAllPokemons();
  INPUT.value = "";
  LESS_POKEMONS.style.display = "none";
  MORE_POKEMONS.disabled = false;
  MORE_POKEMONS.innerHTML = "+" + limit;
}

async function searchPokemon() {
  let name = INPUT.value.trim().toLowerCase();
  renderedPokemons = [];
  searchPokemons = [];
  start = 0;
  end = limit;
  if (name === "") {
    init();
  } else {
    for (let i = 0; i < allPokemons.length; i++) {
      if (allPokemons[i].name.startsWith(name)) {
        searchPokemons.push(allPokemons[i]);
      }
    }
    searchPokemons.sort(sortAlphabetical(searchPokemons));
    renderedPokemons = searchPokemons;
    maxPokemons = searchPokemons.length;
    renderPokemons(renderedPokemons);
    console.log(searchPokemons);
    if (limit >= maxPokemons) {
      MORE_POKEMONS.style.display = "none";
      LESS_POKEMONS.style.display = "none";
    } else {
      MORE_POKEMONS.style.display = "inline";
    }
  }
}

async function makeArray(array, start, end) {
  for (let i = 0; i < end - start; i++) {
    renderedPokemons.push(array[i]);
  }
}

async function getAllPokemons() {
  renderedPokemons = [];
  let responseJson = await fetchUrl(ALL_POKEMON_URL);
  allPokemons = responseJson.results;
  maxPokemons = responseJson.results.length;
  console.log(maxPokemons);
  renderedPokemons = allPokemons;
  renderPokemons(renderedPokemons);
}

async function getPokemons(url) {
  let pokemons = await fetchUrl(url);
  console.log(pokemons);
  setPageDirectionValues(pokemons.next, pokemons.previous, pokemons.count);

  renderPokemons(pokemons.results);
}

function setPageDirectionValues(next, prev, max) {
  nextPokemons = next;
  previousPokemons = prev;
  maxPokemons = max;
}

async function getSinglePokemon(url) {
  let pokemon = await fetchUrl(url);

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

async function renderSinglePokemon(url) {
  let pokemon = await getSinglePokemon(url);
  let stats = getStats(pokemon.stats);
  let species = await getSpecies(pokemon.species.url);
  let types = await getPokemonTypes(pokemon.types);
  let sound = await getSounds(url);

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
    string += getPokemonStatsTemplate(stats[i]);
  }
  return string;
}

async function getPokemonTypes(pokemonTypes) {
  let imgString = "";
  for (let i = 0; i < pokemonTypes.length; i++) {
    let typeImg = await fetchUrl(pokemonTypes[i].type.url);
    imgString += getPokemonTypesTemplate(typeImg);
  }
  return imgString;
}

async function getSpecies(url) {
  let species = await fetchUrl(url);

  return species;
}

async function getSounds(url) {
  let json = await fetchUrl(url);
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
  let array = [];

  if (end > maxPokemons) {
    MORE_POKEMONS.disabled = true;
  } else {
    LESS_POKEMONS.disabled = false;
    start = start + limit;
    end = end + limit;
    if (end > maxPokemons) {
      end = maxPokemons;
    }
    LESS_POKEMONS.style.display = "inline";
    LESS_POKEMONS.innerHTML = "-" + limit;
    for (let i = start; i < end; i++) {
      array.push(renderedPokemons[i]);
    }
    renderPokemons(array);
  }

  console.log(array);
}

function getPrevPokemons() {
  let array = [];

  start = start - limit;
  end = end - limit;

  if (start <= 0) {
    LESS_POKEMONS.style.display = "none";
  }
  for (let i = start; i < end; i++) {
    array.push(renderedPokemons[i]);
  }

  renderPokemons(array);

  console.log(array);
}

async function fetchUrl(url) {
  let response = await fetch(url);
  let responseToJson = await response.json();
  return responseToJson;
}

function toggleDialog() {
  DIALOG.classList.toggle("open");
  document.body.classList.toggle("no_scroll");
}

function openDialog(id) {
  DIALOG.showModal();
  renderSinglePokemon(BASE_URL + id);
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
