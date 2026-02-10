const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/";

const MORE_POKEMONS = document.getElementById("more_pokemons");
const DIALOG = document.getElementById("dialog");

let pokemonCount = 0;
let maxPokemons;
let nextPokemons;
let previousPokemons;

function init() {
  getPokemons(BASE_URL);
}

async function getPokemons(url) {
  let pokemons = await fetchUrl(url);
  console.log(pokemons);
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

  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = await fetchUrl(pokemons[i].url);
    let types = await getPokemonTypes(pokemon.types);
    let species = await getSpecies(pokemons[i].name);

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
  let species = await getSpecies(pokemon.name);
  let types = await getPokemonTypes(pokemon.types);

  console.log(pokemon);
  DIALOG.innerHTML = getSinglePokemonTemplate(pokemon, stats, species, types);
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
    <img src="${typeImg.sprites["generation-viii"]["legends-arceus"].name_icon}" class="type_image" />
    `;
  }
  return imgString;
}

async function getSpecies(name) {
  let species = await fetchUrl(POKEMON_SPECIES_URL + name);

  return species;
}

function getNextPokemons() {
  if (pokemonCount + 20 > maxPokemons) {
    return;
  } else {
    pokemonCount = pokemonCount + 20;
    getPokemons(nextPokemons);
  }
  console.log(pokemonCount);
}

function getPrevPokemons() {
  if (pokemonCount - 20 < 0) {
    return;
  } else {
    pokemonCount = pokemonCount - 20;
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
