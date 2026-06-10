INPUT.onkeyup = (event) => {
  searchPokemon();
};

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
    LESS_POKEMONS.style.display = "inline";
  }
}

function setPokemonNumbers() {
  START_RENDER.innerHTML = start + 1;
  if (end > maxPokemons) {
    END_RENDER.innerHTML = maxPokemons;
  } else {
    END_RENDER.innerHTML = end;
  }
}

function getNextPokemons() {
  start = start + limit;
  end = end + limit;
  if (start >= maxPokemons) {
    start = 0;
    end = limit;
  }
  if (end > maxPokemons) {
    end = maxPokemons;
  }
  setPokemonNumbers();
  pushArray(renderedPokemons);
}

function getPrevPokemons() {
  if (end - start < limit) {
    end = start;
    start = start - limit;
  } else {
    start = start - limit;
    end = end - limit;
  }
  if (start < 0) {
    if (maxPokemons % limit) {
      start = maxPokemons - (maxPokemons % limit);
      end = maxPokemons;
    }
  }
  setPokemonNumbers();
  pushArray(renderedPokemons);
}

function pushArray(array) {
  let renderArray = [];
  for (let i = start; i < end; i++) {
    renderArray.push(array[i]);
  }
  renderPokemons(renderArray);
}

function nextPokemon(id) {
  let singlePokemon = renderedPokemons.find((pokemon) => pokemon.name === id);
  let index = renderedPokemons.indexOf(singlePokemon);
  if (index === renderedPokemons.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
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
  renderSinglePokemon(renderedPokemons[index].url);
}

function proofName(name) {
  if (name.length > 13) {
    return name.slice(0, 12) + "...";
  } else {
    return name;
  }
}
