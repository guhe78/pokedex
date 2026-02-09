const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/";

const MORE_POKEMONS = document.getElementById("more_pokemons");
const DIALOG = document.getElementById("dialog");

function init() {}

async function getPokemons() {
  let pokemons = await fetchUrl(BASE_URL);
  MORE_POKEMONS.onclick = getMorePokemons();

  renderPokemons(pokemons.results);
}

async function getSinglePokemon(id) {
  let pokemon = await fetchUrl(BASE_URL + id);

  return pokemon;
}

async function renderPokemons(pokemons) {
  let pokemonContent = document.getElementById("content");

  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = await fetchUrl(pokemons[i].url);
    let types = await getPokemonTypes(pokemon.types);
    let species = await fetchUrl(pokemon.species.url);

    pokemonContent.innerHTML += `
    <div class="card" onclick="renderSinglePokemon(${pokemon.id})">
      <div class="card_header">
        <p>#${pokemon.id}</p><h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
      </div>
        <div class="card_body" style="background-color: ${species.color.name}">
          <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="..." class="pokemon_img">
        </div>
      <div class="card_footer">
        <div id="pokemon_types">${types}</div>
      </div>
    </div>
    `;
  }
}

function renderSinglePokemon(id) {
  const POKEMON_DETAIL = document.getElementById("pokemon_detail");
  let pokemon = fetchUrl(id);

  console.log(pokemon);
  POKEMON_DETAIL.innerHTML += `

   `;
}

async function getPokemonTypes(pokemonTypes) {
  let imgString = "";
  for (let i = 0; i < pokemonTypes.length; i++) {
    let typeImg = await fetchUrl(pokemonTypes[i].type.url);
    imgString += `
    <img src="${typeImg.sprites["generation-iii"].colosseum.name_icon}" />
    `;
  }
  return imgString;
}

function getMorePokemons(url) {}

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

function openDialog() {
  DIALOG.showModal();
  toggleDialog();
}

function closeDialog() {
  DIALOG.close();
  toggleDialog();
}
