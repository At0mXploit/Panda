import fs from 'fs/promises'
import path from 'path';
import { fetchPokemon } from './prompts.js';
import fetch from 'node-fetch';

const saveImageFile = async (filePath, arrayBuffer) => {
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
};

const createFolder = async (folderName) => {
    const folderPath = path.join(process.cwd(), folderName);
    try {
        await fs.access(folderName);
    } catch {
        await fs.mkdir(folderName)
    }
};

const savePokemonStats = async (folderName, pokemonStatsObject) => {
    let statsString = "";
     for (const stat of pokemonStatsObject) {
        statsString += `${stat.stat.name}: ${stat.base_stat}\n`;
     }
     console.log(statsString);

     await createFolder(folderName);
     const filePath = path.join(process.cwd(), folderName, "stats.txt");
     await fs.writeFile(filePath, statsString);
};

const savePokemonArtwork = async (folderName, pokemonSpriteObject) => {
    const url = pokemonSpriteObject.other["official-artwork"].front_default; 
    console.log(url);
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    await createFolder(folderName);
    const filePath = path.join(process.cwd(), folderName, "artwork.png")
    await saveImageFile(filePath, arrayBuffer);
};

const savePokemonSprites = async (folderName, pokemonSpriteObject) => {
    let spritePromises = [];
    let spriteNames = [];

    for (const [name, url] of Object.entries(pokemonSpriteObject)) {
        if (!url) continue;
        if (name === 'other' || name === 'versions') continue;
        
        const promise = fetch(url).then((res) => res.arrayBuffer());
        spritePromises.push(promise);
        spriteNames.push(name);
    }  
    
    const spriteBuffers = await Promise.all(spritePromises);
    await createFolder(folderName);
    
    for (let i = 0; i < spriteBuffers.length; i++) {
        const filePath = path.join(process.cwd(), folderName, `${spriteNames[i]}.png`);
        await saveImageFile(filePath, spriteBuffers[i]);
    }
};

export { savePokemonStats, savePokemonSprites, savePokemonArtwork };