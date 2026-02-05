const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemons() {
  console.log("Start");
  let pokemons = await fetch(BASE_URL);
  let pokemonsToJson = await pokemons.json();
  let length = pokemonsToJson.length;
  console.log(length);

  console.log(pokemonsToJson.results);
  for (let i = 0; i < 40; i++) {
    console.log(pokemonsToJson.results[i].url);
    let singlePokemon = await getSinglePokemon(pokemonsToJson.results[i]);
    console.log(singlePokemon);
    renderPokemons(singlePokemon);
  }
}

async function getSinglePokemon(singlePokemon) {
  let pokemon = await fetch(singlePokemon.url);
  let pokemonToJson = await pokemon.json();
  console.log(pokemonToJson);
  return pokemonToJson;
}

function renderPokemons(pokemon) {
  let pokemonContent = document.getElementById("content");
  pokemonContent.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="${pokemon.sprites.other.home.front_shiny}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <a href="${pokemon.species.url}" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
  `;
}

function renderSinglePokemon() {}
