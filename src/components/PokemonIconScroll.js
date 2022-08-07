import React from "react";

function PokemonIconScroll({pokemon, size, pokemonId, varietyIndex=0}){

    const images = require.context('../images/pokemon', true)

    const getImage = () => {

        const gender_options = ['mf', 'md', 'fd', 'mo', 'fo', 'uk']
        let imageString = ''

        for(var i = 0; i < gender_options.length; i++){
            try {
                imageString = images(`./${pokemonId}_${varietyIndex}_${gender_options[i]}_n_0.png`)
                break
            }
            catch{

            }
        }
        return imageString
    }
 
    return (
        <div className="scroll-icon">
            <img src={getImage()} alt={pokemon.name} width={size} height={size}/>
        </div>
    )
}

export default PokemonIconScroll