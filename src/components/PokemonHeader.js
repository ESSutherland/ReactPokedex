import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, {useState, useEffect} from "react";

function PokemonHeader({pokemonSpecies, pokeId, maxNum, setPokeId}) {

    const [name, setName] = useState('')

    const getEnglishName = async(nameList) => {
        nameList.forEach((n) => {
            if(n.language.name === 'en'){
                setName(n.name)
            }
        })
    }

    useEffect(() => {
        getEnglishName(pokemonSpecies.names)
    },[pokemonSpecies])

    let PrevButtonClass = (pokeId > 1)? 'btn' : 'btn disabled'
    let NextButtonClass = (pokeId < maxNum)? 'btn' : 'btn disabled'

    return (
        <div className="pokemon-header">
            <div className={PrevButtonClass} onClick={() => {
                if(pokeId > 1){
                    setPokeId(pokeId-1)
                }
            }}> {'<'} </div>
            <div className="number">#{pokemonSpecies.id.toString().padStart(3,'0')}</div>
            <div className="name">{name}</div>
            <div className={NextButtonClass}onClick={() => {
                if(pokeId < maxNum){
                    setPokeId(pokeId+1)
                }
            }}> {'>'} </div>
        </div>
    )
}

export default PokemonHeader