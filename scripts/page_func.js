INPUT.onkeyup = searchPokemon;

MORE_POKEMONS.onclick = getNextPokemons;
LESS_POKEMONS.onclick = getPrevPokemons;

DIALOG.onclick = (event) => {
  if (event.target === DIALOG) {
    closeDialog();
  }
};

function toggleDialog() {
  DIALOG.classList.toggle("open");
  document.body.classList.toggle("no_scroll");
}

function openDialog(id) {
  DIALOG.showModal();
  renderSinglePokemon(BASE_URL + id);
  toggleDialog();
}

function closeDialog() {
  DIALOG.close();
  toggleDialog();
}

async function playSound(file) {
  let audio = new Audio(file);
  audio.play().catch((error) => {
    if (error.name !== "AbortError") {
      console.error(error);
    }
  });
}

function proofDirectionButtons() {
  if (limit >= maxPokemons) {
    MORE_POKEMONS.style.display = "none";
    LESS_POKEMONS.style.display = "none";
  } else {
    MORE_POKEMONS.style.display = "inline";
  }
}

function setPokemonNumbers() {
  START_RENDER.innerHTML = start + 1;
  END_RENDER.innerHTML = end;
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
  setPokemonNumbers();
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
  setPokemonNumbers();
  MORE_POKEMONS.style.display = "inline";
  if (start <= 0) {
    LESS_POKEMONS.style.display = "none";
  }
  for (let i = start; i < end; i++) {
    array.push(renderedPokemons[i]);
  }
  renderPokemons(array);
}

function nextPokemon(id) {
  let singlePokemon = renderedPokemons.find((pokemon) => pokemon.name === id);
  let index = renderedPokemons.indexOf(singlePokemon);
  if (index === renderedPokemons.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  console.log(renderedPokemons);
  console.log(index);
  renderSinglePokemon(renderedPokemons[index].url);
}

function prevPokemon(id) {
  let singlePokemon = renderedPokemons.find((pokemon) => pokemon.name === id);
  let index = renderedPokemons.indexOf(singlePokemon);
  if (index === 0) {
    index = renderedPokemons.length - 1;
  } else {
    index--;
  }
  console.log(renderedPokemons);
  renderSinglePokemon(renderedPokemons[index].url);
}
