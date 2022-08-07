import React, {useState, useEffect} from "react";
import PokemonAbility from "./PokemonAbility";

function PokemonAbilities({pokemon, getResource}){
    const [abilities, setAbilities] = useState([])
    const [hiddenAbilities, setHiddenAbilities] = useState([])

    useEffect(() => {
        setAbilities([])
        setHiddenAbilities([])
        pokemon.abilities.forEach((a) => {
            getResource(a.ability.url).then((ability) => {
                if(!a.is_hidden){
                    setAbilities(current => [...current, ability])
                }
                else{
                    setHiddenAbilities(current => [...current, ability])
                }
            })
        })
    }, [pokemon])

    return(
        <div className="abilities">
            <div className="ability-title">Abilities</div>
            {
                abilities.map((a, index) => {
                    return <PokemonAbility key={a.id} ability={a} hidden={false}/>
                })
            }
            {
                hiddenAbilities.map((a, index) => {
                    return <PokemonAbility key={a.id} ability={a} hidden={true}/>
                })
            }
        </div>
    )
}

export default PokemonAbilities