//Access the search input submission
const searchForm = document.getElementById("search");
const searchInput = document.getElementById("search-input");

//Access each output data cell
const pokeName = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const spriteDiv = document.getElementById("sprite-div");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

//Link the API for pokemon
const searchDex = async () => {
    try {
        //Match search input to pokedex
        const query = searchInput.value.toLowerCase();
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`);
        const data = await response.json();
        //Populate result div with pokemon-specific data
        pokeName.textContent = `${data.name.toUpperCase()}`;
        id.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        spriteDiv.innerHTML =`
        <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
        
        types.innerHTML = data.types
            .map(obj => `<span class="${obj.type.name} type">${obj.type.name.toUpperCase()}</span>`)
            .join("");

        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        spAttack.textContent = data.stats[3].base_stat;
        spDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;
    } catch (err){
        //If no match, alert "Pokémon not found".
        alert("Pokémon not found");
        resetDex();
        console.log(`Error: ${err}`);
    }
};

const resetDex = () => {
    pokeName.textContent ="";
    id.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    sprite.innerHTML = "";
    types.innerHTML = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    spAttack.textContent = "";
    spDefense.textContent = "";
    speed.textContent = "";
};

//Add Event Listener for enter key and clicking the search button.
search.addEventListener('submit', e => {
    e.preventDefault();
    searchDex();
});