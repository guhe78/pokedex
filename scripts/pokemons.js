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
    searchPokemons.sort(sortAlphabetical(searchPokemons));
    renderedPokemons = searchPokemons;
    maxPokemons = searchPokemons.length;
    TOTAL_POKEMONS.innerHTML = maxPokemons;

    renderPokemons(renderedPokemons);
    if (limit >= maxPokemons) {
      MORE_POKEMONS.style.display = "none";
      LESS_POKEMONS.style.display = "none";
    } else {
      MORE_POKEMONS.style.display = "inline";
    }
  }
}

async function getAllPokemons() {
  let responseJson = await fetchUrl(ALL_POKEMON_URL);
  allPokemons = responseJson.results;
  maxPokemons = responseJson.results.length;
  TOTAL_POKEMONS.innerHTML = maxPokemons;
  renderedPokemons = allPokemons;
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

function getNextPokemons() {
  let array = [];

  start = start + limit;
  end = end + limit;
  if (end > maxPokemons - end) {
    MORE_POKEMONS.style.display = "none";
    end = maxPokemons;
    console.log("start:" + start + "end:" + end);
  }

  console.log("--- start:" + start + "end:" + end);

  LESS_POKEMONS.style.display = "inline";
  LESS_POKEMONS.innerHTML = "-" + limit;
  for (let i = start; i < end; i++) {
    array.push(renderedPokemons[i]);
  }
  renderPokemons(array);
}

function getPrevPokemons() {
  let array = [];
  console.log("start:" + start + "end:" + end + " limit" + limit);

  start = start - limit;
  end = end - limit;
  if (end < limit) {
    end = limit;
  }
  console.log("start:" + start + "end:" + end + " limit" + limit);
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
