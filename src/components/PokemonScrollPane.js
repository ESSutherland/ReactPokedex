import React, {useState} from "react";
import PokemonIconScroll from "./PokemonIconScroll";

function PokemonScrollPane({pokemon, setPokeId, pokemonId, dataKey, pokeId}){

    const classes = (dataKey === pokeId)?'pane-container selected-pane' : 'pane-container'

    return(
        <div className={classes} onClick={() => {setPokeId(pokemonId)}}>
            <div className="pane-number">#{pokemonId.toString().padStart(3,'0')}</div>
            <PokemonIconScroll pokemon={pokemon} size={50} pokemonId={pokemonId}/>
        </div>
    )
}

export default PokemonScrollPane