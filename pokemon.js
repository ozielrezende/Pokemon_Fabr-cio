const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonIdInput = document.getElementById('pokemon-id');
const searchButton = document.getElementById('search-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentPokemonId = 1;

const typeBackgrounds = {
    fire: 'red',
    water: 'blue',
    grass: 'green',
    electric: 'yellow',
    ground: 'brown',
    poison: 'purple',
};

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokémon não encontrado');
        
        const pokemon = await response.json();
        displayPokemon(pokemon);
    } catch (error) {
        alert(error.message);
    }
}

function displayPokemon(pokemon) {
    pokemonName.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonImage.src = pokemon.sprites.front_default;

    const primaryType = pokemon.types[0].type.name;
    document.body.className = typeBackgrounds[primaryType] || '';
}

searchButton.addEventListener('click', () => {
    const id = parseInt(pokemonIdInput.value);
    if (id > 0) {
        currentPokemonId = id;
        fetchPokemon(currentPokemonId);
    } else {
        alert('Por favor, insira um ID válido.');
    }
});

pokemonIdInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

prevButton.addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});

nextButton.addEventListener('click', () => {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
});

fetchPokemon(currentPokemonId);
