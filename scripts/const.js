const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const ALL_POKEMON_URL =
  "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

const DIALOG = document.getElementById("dialog");
const INPUT = document.getElementById("pokemon_search");
const MORE_POKEMONS = document.getElementById("more_pokemons");
const LESS_POKEMONS = document.getElementById("less_pokemons");
const TOTAL_POKEMONS = document.getElementById("total_pokemons");
const START_RENDER = document.getElementById("start_render");
const END_RENDER = document.getElementById("end_render");
