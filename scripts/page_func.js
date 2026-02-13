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
