import React, {useState, useEffect} from "react";
import PokemonAbilities from './PokemonAbilities';

function PokemonHeightWeight({pokemon, getResource}){
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')

    const convertHeight = (h) => {
        const meterToFeet = 3.28084
        let num = (h/10).toFixed(1)
        let num2 = Math.round((num*meterToFeet)*10)/10
        
        let num3 = Math.floor(num2)
        let num4 = (num2 - num3)

        let num5 = Math.round(12*num4)

        let feet = `${num3}'`
        let inches = `${num5}"`

        setHeight(feet+inches)
    }

    const convertWeight = (w) => {
        const kgToPounds = 2.20462262185
        let num = (w/10).toFixed(1)
        let num2 = Math.round((num*kgToPounds)*10)/10

        setWeight(`${num2} lbs.`)
    }

    useEffect(() => {
        convertHeight(pokemon.height)
        convertWeight(pokemon.weight)
    })

    return (
        <div className="height-weight">
            <div className="hw-container">
                <div className="hw-title">Height</div>
                <div>{height}</div>
            </div>
            <div className="hw-container">
                <div className="hw-title">Weight</div>
                <div>{weight}</div>
            </div>
            <PokemonAbilities pokemon={pokemon} getResource={getResource}/>
        </div>
    )
}

export default PokemonHeightWeight