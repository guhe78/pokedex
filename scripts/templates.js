function getPokemonOverviewTemplate(pokemon, types, species) {
  return `
    <div class="pokemon_overview_card card" onclick="openDialog(${pokemon.id})">
      <div class="card_header">
        <p>#${pokemon.id}</p>
        <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      </div>
        <div class="overview_card_body" style="background-color: ${species.color.name}">
          <img src="${pokemon.sprites.other["dream_world"].front_default || pokemon.sprites.other["official-artwork"].front_shiny || pokemon.sprites.front_default}" alt="Image des Pokemons" class="pokemon_img">
        </div>
        <div class="card_footer overview_pokemon_card" id="pokemon_types">${types}</div>
    </div>
    `;
}

function getSinglePokemonTemplate(pokemon, stats, species, types, sound) {
  return `
  <div class="pokemon_detail_card card">
    <div class="card_header">
      <p>#${pokemon.id}</p>
      <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <button class="close_dialog" onclick="closeDialog()">x</button>
    </div>
    <div class="card_body" style="background-color: ${species.color.name}">
      <img src="${pokemon.sprites.other["official-artwork"].front_shiny}" 
          alt="${pokemon.name} von vorne" class="dialog_image">
        <div class="pokemon_stats">
          <div class="pokemon_stats_text">
            <p>xp: ${pokemon.base_experience}</p>
            <p>Größe: ${pokemon.height}</p>
            <p>Gewicht: ${pokemon.weight}</p>
          </div>
            <button class="play_sound" ${!sound ? "disabled" : ""} onclick="playSound(\'${sound}'\)">${!sound ? "No cry" : "Cry &#127925;"}</button>
        </div>
    </div>
    <div class="attack_stats">${stats}</div>
    <div class="card_footer single_pokemon_card" id="pokemon_types">${types}</div>
</div>
  `;
}

function getPokemonStatsTemplate(stats) {
  return `
    <p>${stats.stat.name}: ${stats.base_stat}</p>
    `;
}

function getPokemonTypesTemplate(typeImg) {
  return `
    <img src="${
      typeImg.sprites?.["generation-viii"]?.["legends-arceus"]?.name_icon ||
      typeImg.sprites?.["generation-iii"]?.["colosseum"]?.name_icon
    }" class="type_image" />
    `;
}
