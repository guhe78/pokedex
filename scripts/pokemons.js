async function searchPokemon() {
  let name = INPUT.value.trim().toLowerCase();
  startDirection();
  if (name === "") {
    init();
  } else {
    for (let i = 0; i < allPokemons.length; i++) {
      if (allPokemons[i].name.startsWith(name)) {
        searchPokemons.push(allPokemons[i]);
      }
    }
    setPokemons(searchPokemons.sort(sortAlphabetically(searchPokemons)));
    renderPokemons(renderedPokemons);
    proofDirectionButtons();
  }
}

function setPokemons(pokemons) {
  renderedPokemons = pokemons;
  maxPokemons = pokemons.length;
  TOTAL_POKEMONS.innerHTML = maxPokemons;
}

async function getAllPokemons() {
  let responseJson = await fetchUrl(ALL_POKEMON_URL);
  allPokemons = responseJson.results;
  setPokemons(allPokemons);

  renderPokemons(renderedPokemons);
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
    let pokemon = await getSinglePokemon(pokemons[i].url);
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
  let types = await getPokemonTypes(pokemon.types);
  let species = await getSpecies(pokemon.species.url);
  let sound = await getSounds(url);
  let stats = getStats(pokemon.stats);

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

function getNextPokemons() {
  let array = [];
  start = start + limit;
  end = end + limit;
  LESS_POKEMONS.style.display = "inline";
  if (end > maxPokemons) {
    MORE_POKEMONS.style.display = "none";
    end = maxPokemons;
  }
  for (let i = start; i < end; i++) {
    array.push(renderedPokemons[i]);
  }
  renderPokemons(array);
}

function getPrevPokemons() {
  let array = [];
  start = start - limit;
  end = end - limit;

  if (end < limit) {
    end = limit;
  }

  MORE_POKEMONS.style.display = "inline";
  if (start <= 0) {
    LESS_POKEMONS.style.display = "none";
  }
  for (let i = start; i < end; i++) {
    array.push(renderedPokemons[i]);
  }
  renderPokemons(array);
}

async function fetchUrl(url) {
  let response = await fetch(url);
  let responseToJson = await response.json();
  return responseToJson;
}

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
