function init() {
  fetchAllPokemons();
  startDirection();

  INPUT.value = "";
}

function startDirection() {
  renderedPokemons = [];
  searchPokemons = [];
  start = 0;
  end = limit;

  setPokemonNumbers();
}

async function fetchAllPokemons() {
  let responseJson = await fetchUrl(ALL_POKEMON_URL);
  allPokemons = responseJson.results;
  getAllPokemons();
}
