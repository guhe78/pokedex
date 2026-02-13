function init() {
  getAllPokemons();
  INPUT.value = "";
  startDirection();
}

function startDirection() {
  renderedPokemons = [];
  searchPokemons = [];
  start = 0;
  end = limit;
  LESS_POKEMONS.style.display = "none";
  MORE_POKEMONS.disabled = false;
  MORE_POKEMONS.innerHTML = "+" + limit;
  LESS_POKEMONS.innerHTML = "-" + limit;
}
