/**
 * This function generates the HTML template for a pokemon's overview card.
 * @param {Object} pokemon - The pokemon object containing its details.
 * @param {string} types - The types of the pokemon.
 * @param {Object} species - The species object containing color information.
 * @returns {string} - The HTML template for the pokemon's overview card.
 */
function getPokemonOverviewTemplate(pokemon, types, species) {
  return `
    <article class="pokemon_overview_card card" onclick="openDialog(${pokemon.id})">
      <div class="card_header">
        <p>#${pokemon.id}</p>
        <h3 class="pokemon_name_overview">${proofName(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))}</h3>
      </div>
        <div class="overview_card_body" style="background-color: ${species.color.name}">
          <img src="${pokemon.sprites.other["dream_world"].front_default || pokemon.sprites.other["official-artwork"].front_shiny || pokemon.sprites.front_default || "./assets/icons/broken_image.png"}" alt="Image des Pokemons" loading="lazy" class="pokemon_img">
        </div>
        <div class="card_footer overview_pokemon_card" id="pokemon_types">${types}</div>
    </article>
    `;
}

/**
 * This function generates the HTML template for a single pokemon's detailed view.
 * @param {Object} pokemon - The pokemon object containing its details.
 * @param {Array} stats - The array of stats for the pokemon.
 * @param {Object} species - The species object containing color information.
 * @param {string} types - The types of the pokemon.
 * @param {string} sound - The sound file path for the pokemon's cry.
 * @returns {string} - The HTML template for the single pokemon view.
 */
function getSinglePokemonTemplate(pokemon, stats, species, types, sound) {
  return `
    <div class="card_header">
      <p>#${pokemon.id}</p>
      <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <button class="close_dialog" onclick="closeDialog()" aria-label="Dialog schliessen">x</button>
    </div>
    <div class="card_body" style="background-color: ${species.color.name}">
      <img src="${pokemon.sprites.other["official-artwork"].front_shiny || "./assets/icons/broken_image.png"}" loading="lazy" 
          alt="${pokemon.name} von vorne" class="dialog_image">
        <div class="pokemon_stats">
          <div class="pokemon_stats_text">
            <p>xp: ${pokemon.base_experience || "N/A"}</p>
            <p>Größe: ${pokemon.height}</p>
            <p>Gewicht: ${pokemon.weight}</p>
          </div>
          <div class="stats_extra">
            <button class="play_sound" ${!sound ? "disabled" : ""} onclick="playSound(\'${sound}'\)">${!sound ? "No cry" : "Cry &#127925;"}</button>
            <div class="single_pokemon_types" id="pokemon_types">${types}</div>
          </div>
        </div>
    </div>
    <div class="attack_stats">${stats}</div>
  `;
}

/**
 * This function generates the HTML template for a pokemon's stats.
 * @param {Object} stats - The stats object containing the stat name and base stat value.
 * @returns {string} - The HTML template for the pokemon's stats.
 */
function getPokemonStatsTemplate(stats) {
  return `
    <p>${stats.stat.name}: ${stats.base_stat}</p>
    <div class="stats_width" style="width: ${stats.base_stat > 100 ? 105 : stats.base_stat}%; background-color: ${stats.base_stat > 100 ? "red" : "yellow"}"></div>
    `;
}

/**
 * This function generates the HTML template for a pokemon's types.
 * @param {Object} typeImg - The type image object containing the sprites for different generations.
 * @returns {string} - The HTML template for the pokemon's types.
 */
function getPokemonTypesTemplate(typeImg) {
  return `
    <img src="${
      typeImg.sprites?.["generation-viii"]?.["legends-arceus"]?.name_icon ||
      typeImg.sprites?.["generation-iii"]?.["colosseum"]?.name_icon
    }" class="type_image" loading="lazy" />
    `;
}
