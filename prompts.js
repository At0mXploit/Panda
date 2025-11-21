import fetch from 'node-fetch';
import inquirer from 'inquirer';
import { savePokemonStats, savePokemonSprites, savePokemonArtwork } from './saving.js';

const promptForPokemon = async () => {
    return await inquirer.prompt({
        type: 'input',
        name: 'pokemon_name',
        message: 'Pokemon name: '
    });
};

const promptForDownloadInfo = async () => {
    return await inquirer.prompt({
        type: 'checkbox',
        name: 'options',
        message: 'Pokemon info to download: ',
        choices: [
            new inquirer.Separator("-- Options --"),
            {
                name: "Stats",
            },
            {
                name: "Sprites",
            },
            {
                name: "Artwork",
            }
        ],
    });
};

const promptToContinue = async () => {
    return await inquirer.prompt({
        type: 'list',
        message: "Would you like to search for another pokemon?",
        name: "continue",
        choices: ["Yes", "No"],
    });
};

const fetchPokemon = async (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

const promptUser = async() => {
    while (true) {
        const pokemonName = await promptForPokemon();
        
        const pokemonJSON = await fetchPokemon(pokemonName.pokemon_name);
        console.log(pokemonJSON.name, pokemonJSON.weight);

        const pokemonOptions = await promptForDownloadInfo(); 
        
        const folderName = pokemonJSON.name;
        
        if (pokemonOptions.options.includes("Stats")) {
            await savePokemonStats(folderName, pokemonJSON.stats);
        }
        
        if (pokemonOptions.options.includes("Sprites")) {
            await savePokemonSprites(folderName, pokemonJSON.sprites);
        }
        
        if (pokemonOptions.options.includes("Artwork")) {
            await savePokemonArtwork(folderName, pokemonJSON.sprites);
        }
        
        const keepGoing = await promptToContinue();
        if (keepGoing.continue === "No") break;
    }
}

promptUser();
export { fetchPokemon };