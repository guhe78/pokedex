/**
 * This function initializes the application by fetching all pokemons, setting the initial direction, and clearing the input field, inits the Eventlisteners.
 * @returns {Promise<void>}
 */
async function init() {
  initEventListeners();
  await fetchAllPokemons();
  startDirection();
  INPUT.value = "";
}

/**
 * This function is called when the user types in the search input field. It trims the input value, converts it to lowercase, and then filters the list of all pokemons based on whether their names start with the input value. The filtered list is then sorted alphabetically and rendered on the page. If the input value is empty, all pokemons are rendered.
 */
function startDirection() {
  renderedPokemons = [];
  searchPokemons = [];
  start = 0;
  end = limit;
  setPokemonNumbers();
}

/**
 * This function fetches the data of all pokemons from the API and sets it to be rendered on the page. It updates the total number of pokemons displayed and calls the function to set the pokemon numbers for pagination.
 * @returns {Promise<void>}
 */
async function fetchAllPokemons() {
  let responseJson = await fetchUrl(ALL_POKEMON_URL);
  allPokemons = responseJson.results;
  setPokemons(allPokemons);
}
