async function searchPokemon() {
  let name = INPUT.value.trim().toLowerCase();
  startDirection();
  if (name === "") {
    setPokemons(allPokemons);
  } else {
    let searchPokemons = allPokemons
      .filter((pokemons) => pokemons.name.startsWith(name))
      .sort((a, b) =>
        a.name.localeCompare(b.name, "de", { sensitivity: "base" }),
      );
    setPokemons(searchPokemons);
    proofDirectionButtons();
  }
}

async function getAllPokemons() {
  setPokemons(allPokemons);
}

function setPokemons(pokemons) {
  renderedPokemons = pokemons;
  renderPokemons(renderedPokemons);
  maxPokemons = pokemons.length;
  TOTAL_POKEMONS.innerHTML = maxPokemons;
  setPokemonNumbers();
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

  PREV_POKEMON.onclick = () => prevPokemon(pokemon.name);
  NEXT_POKEMON.onclick = () => nextPokemon(pokemon.name);

  POKEMON_CARD.innerHTML = getSinglePokemonTemplate(
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
