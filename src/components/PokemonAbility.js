import React, {useState, useEffect} from "react";

function PokemonAbility({ability, hidden}){

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const getEnglishName = () => {
        ability.names.forEach((n) => {
            if (n.language.name === 'en'){
                setName(n.name)
            }
        })
    }

    const getEnglishDesc = () => {
        ability.effect_entries.forEach((n) => {
            if (n.language.name === 'en'){
                setDesc(n.short_effect)
            }
        })
    }

    useEffect(() => {
        getEnglishName()
        getEnglishDesc()
    }, [])

    return <div className="ability"><div className="ability-name">{name} <span className="hidden">{(hidden)? '(Hidden)' : ''}</span></div> <div className="ability-desc">{desc}</div></div>
}

export default PokemonAbility