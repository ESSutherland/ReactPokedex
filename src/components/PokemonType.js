import React, {useState, useEffect} from "react";

function PokemonType({pokemonType}){

    const [name, setName] = useState('')

    const iconClasses = `type-box ${pokemonType.name}-icon`
    const images = require.context('../images/icons', true)
    const icon = images(`./${pokemonType.name}.svg`)

    const getEnglishName = () => {
        pokemonType.names.forEach((n) => {
            if(n.language.name === 'en'){
                setName(n.name)
            }
            return
        })
        return
    }

    useEffect(() => {
        getEnglishName()
    })

    return (
        <div className={iconClasses}>
            <div className='icon'><img src={icon} alt={name}/></div>
            <div className="type-name">{name}</div>
        </div>
    )
}

export default PokemonType