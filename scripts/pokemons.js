/**
 * This function searches for pokemons based on the input value. It trims and converts the input to lowercase, then filters the list of all pokemons to find those whose names start with the input value. The filtered list is then sorted alphabetically and rendered on the page. If the input is empty, it renders all pokemons.
 * @returns {Promise<void>}
 */
async function searchPokemon() {
  let name = INPUT.value.trim().toLowerCase();
  startDirection();
  if (name === "") {
    setPokemons(allPokemons);
  } else {
    let searchPokemons = allPokemons
      .filter((pokemons) => pokemons.name.startsWith(name))
      .sort((a, b) => a.name.localeCompare(b.name, "de", { sensitivity: "base" }));
    setPokemons(searchPokemons);
    proofDirectionButtons();
  }
}

/**
 * This function sets the pokemons to be rendered and updates the total number of pokemons displayed.
 * @param {*} pokemons
 * @returns {void}
 */
function setPokemons(pokemons) {
  renderedPokemons = pokemons;
  renderPokemons(renderedPokemons);
  maxPokemons = pokemons.length;
  TOTAL_POKEMONS.innerHTML = maxPokemons;
  setPokemonNumbers();
}

/**
 *  This function fetches the data of a single pokemon from the given URL and returns it as a JSON object.
 * @param {*} url
 * @returns {Promise<Object>}
 */
async function getSinglePokemon(url) {
  let pokemon = await fetchUrl(url);
  return pokemon;
}

/**
 * This function renders a list of pokemons on the page. It fetches the data of each pokemon, including its types and species, and then updates the inner HTML of the content element with the overview template for each pokemon.
 * @param {*} pokemons
 * @returns {Promise<void>}
 */
async function renderPokemons(pokemons) {
  let pokemonContent = document.getElementById("content");
  pokemonContent.innerHTML = "";
  let length = pokemons.length;
  if (length > limit) {
    length = limit;
  }
  for (let i = 0; i < length; i++) {
    let pokemon = await getSinglePokemon(pokemons[i].url);
    let types = await getPokemonTypes(pokemon.types);
    let species = await getSpecies(pokemon.species.url);
    pokemonContent.innerHTML += getPokemonOverviewTemplate(pokemon, types, species);
  }
}

/**
 * This function renders detailed information for a single pokemon. It fetches the data of the pokemon, including its types, species, and sounds, and then updates the inner HTML of the pokemon card element with the detailed template.
 * @param {*} url
 * @returns {Promise<void>}
 */
async function renderSinglePokemon(url) {
  let pokemon = await getSinglePokemon(url);
  let types = await getPokemonTypes(pokemon.types);
  let species = await getSpecies(pokemon.species.url);
  let sound = await getSounds(url);
  let stats = getStats(pokemon.stats);

  PREV_POKEMON.onclick = () => prevPokemon(pokemon.name);
  NEXT_POKEMON.onclick = () => nextPokemon(pokemon.name);

  POKEMON_CARD.innerHTML = getSinglePokemonTemplate(pokemon, stats, species, types, sound);
}

/**
 * This function generates the HTML string for the stats of a pokemon. It iterates through the stats array and concatenates the HTML template for each stat into a single string, which is then returned.
 * @param {*} stats
 * @returns {string}
 */
function getStats(stats) {
  let string = "";
  for (let i = 0; i < stats.length; i++) {
    string += getPokemonStatsTemplate(stats[i]);
  }
  return string;
}

/**
 *  This function fetches the images of the types of a pokemon and returns them as a string of HTML.
 * @param {*} pokemonTypes
 * @returns {Promise<string>}
 */
async function getPokemonTypes(pokemonTypes) {
  let imgString = "";
  for (let i = 0; i < pokemonTypes.length; i++) {
    let typeImg = await fetchUrl(pokemonTypes[i].type.url);
    imgString += getPokemonTypesTemplate(typeImg);
  }
  return imgString;
}

/**
 *  This function fetches the species data of a pokemon from the given URL and returns it as a JSON object.
 * @param {*} url
 * @returns {Promise<Object>}
 */
async function getSpecies(url) {
  let species = await fetchUrl(url);
  return species;
}

/**
 *  This function fetches the sounds of a pokemon from the given URL and returns the latest cry.
 * @param {*} url
 * @returns {Promise<string>}
 */
async function getSounds(url) {
  let json = await fetchUrl(url);
  return json.cries.latest;
}

/**
 *  This function fetches data from the given URL and returns it as a JSON object.
 * @param {*} url
 * @returns {Promise<Object>}
 */
async function fetchUrl(url) {
  let response = await fetch(url);
  let responseToJson = await response.json();
  return responseToJson;
}

/**
 * This function sorts an array of pokemons alphabetically by their names.
 * @param {*} array
 * @returns {void}
 */
function sortAlphabetically(array) {
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
