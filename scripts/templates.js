function getPokemonOverviewTemplate(pokemon, types, species) {
  return `
    <div class="card" onclick="openDialog(${pokemon.id})">
      <div class="card_header">
        <p>#${pokemon.id}</p>
        <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      </div>
        <div class="overview_card_body" style="background-color: ${species.color.name}">
          <img src="${pokemon.sprites.other["dream_world"].front_default}" alt="..." class="pokemon_img">
        </div>
        <div class="card_footer overview_pokemon_card" id="pokemon_types">${types}</div>
    </div>
    `;
}

function getSinglePokemonTemplate(pokemon, stats, species, types) {
  return `
  <div class="pokemon_detail card">
    <div class="card_header">
      <p>#${pokemon.id}</p>
      <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    </div>
    <div class="card_body" style="background-color: ${species.color.name}">
      <img src="${pokemon.sprites.other["official-artwork"].front_shiny}" 
          alt="${pokemon.name} von vorne" class="dialog_image">
        <div class="pokemon_stats">
            <p>xp: ${pokemon.base_experience}</p>
            <p>Größe: ${pokemon.height}</p>
            <p>Gewicht: ${pokemon.weight}</p>
        </div>
    </div>
    <div class="attack_stats">
        ${stats}
    </div>
    <div class="card_footer single_pokemon_card" id="pokemon_types">${types}</div>
</div>
  `;
}

function getPokemonTypesTemplate(stats) {
  return `
    <p>
      ${stats.stat.name}: ${stats.base_stat}
    </p>
    `;
}
