/**
 * This function initializes the event listeners for the search input field, the "Next" and "Previous" buttons, and the dialog. It sets up the appropriate event handlers for each element to handle user interactions.
 * @returns {void}
 */
function initEventListeners() {
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
}

/**
 * This function toggles the visibility of the dialog and the scroll state of the body.
 * @returns {void}
 */
function toggleDialog() {
  DIALOG.classList.toggle("open");
  document.body.classList.toggle("no_scroll");
}

/**
 * This function is called when the user types in the search input field. It trims the input value, converts it to lowercase, and then filters the list of all pokemons based on whether their names start with the input value. The filtered list is then sorted alphabetically and rendered on the page. If the input value is empty, all pokemons are rendered.
 * @returns {Promise<void>}
 */
function openDialog(id) {
  DIALOG.showModal();
  renderSinglePokemon(BASE_URL + id);
  toggleDialog();
}

/**
 * This function closes the dialog and toggles the dialog state.
 * @returns {void}
 */
function closeDialog() {
  DIALOG.close();
  toggleDialog();
}

/**
 * This function plays a sound from the given file.
 * @param {string} file - The path to the audio file.
 * @returns {Promise<void>}
 */
async function playSound(file) {
  let audio = new Audio(file);
  audio.play().catch((error) => {
    if (error.name !== "AbortError") {
      console.error(error);
    }
  });
}

/**
 * This function updates the visibility of the direction buttons based on the current state.
 * @returns {void}
 */
function proofDirectionButtons() {
  if (limit >= maxPokemons) {
    MORE_POKEMONS.style.display = "none";
    LESS_POKEMONS.style.display = "none";
  } else {
    MORE_POKEMONS.style.display = "inline";
    LESS_POKEMONS.style.display = "inline";
  }
}

/**
 * This function updates the displayed numbers for the current range of pokemons.
 * @returns {void}
 */
function setPokemonNumbers() {
  START_RENDER.innerHTML = start + 1;
  if (end > maxPokemons) {
    END_RENDER.innerHTML = maxPokemons;
  } else {
    END_RENDER.innerHTML = end;
  }
}

/**
 * This function updates the range of pokemons to be displayed when the user clicks the "Next" button. It increments the start and end indices by the limit, checks if they exceed the maximum number of pokemons, and then calls the function to update the displayed numbers and render the new range of pokemons.
 * @returns {void}
 */
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

/**
 * This function updates the range of pokemons to be displayed when the user clicks the "Previous" button. It decrements the start and end indices by the limit, checks if they go below zero, and then calls the function to update the displayed numbers and render the new range of pokemons.
 * @returns {void}
 */
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

/**
 * This function creates a subarray of the given array based on the current start and end indices and renders it.
 * @param {Array} array - The array of pokemons to be rendered.
 * @returns {void}
 */
function pushArray(array) {
  let renderArray = [];
  for (let i = start; i < end; i++) {
    renderArray.push(array[i]);
  }
  renderPokemons(renderArray);
}

/**
 * This function renders the next pokemon in the list based on the given id.
 * @param {string} id - The id of the current pokemon.
 * @returns {void}
 */
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

/**
 * This function renders the previous pokemon in the list based on the given id.
 * @param {string} id - The id of the current pokemon.
 * @returns {void}
 */
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

/**
 * This function truncates the given name if it exceeds a certain length and adds ellipsis.
 * @param {string} name - The name to be truncated.
 * @returns {string} - The truncated name.
 */
function proofName(name) {
  if (name.length > 13) {
    return name.slice(0, 12) + "...";
  } else {
    return name;
  }
}
