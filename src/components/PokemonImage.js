import React from "react";

function PokemonImage({pokemonSpecies, pokemonGender, varietyIndex, size, isShiny, form}){

    const images = require.context('../images/pokemon', true)

    const getImage = () => {

        const gender_options = ['mf', 'md', 'fd', 'mo', 'fo', 'uk']
        let imageString = ''
        let gmaxString = 'n'

        if(form.name.includes('gmax')){
            gmaxString = 'g'
            varietyIndex = 0
        }


        for(var i = 0; i < gender_options.length; i++){
            try {
                if(!isShiny){
                    if(pokemonSpecies.name === 'minior' && varietyIndex < 7){
                        imageString = images(`./${pokemonSpecies.id}_0_${gender_options[i]}_${gmaxString}_0.png`)
                    }
                    else{
                        imageString = images(`./${pokemonSpecies.id}_${varietyIndex}_${gender_options[i]}_${gmaxString}_0.png`)
                    }
                }
                else{
                    if(pokemonSpecies.name === 'minior'){
                        if(varietyIndex >= 7){
                            imageString=images(`./${pokemonSpecies.id}_7_${gender_options[i]}_${gmaxString}_0_s.png`)
                        }
                        else{
                            imageString = images(`./${pokemonSpecies.id}_0_${gender_options[i]}_${gmaxString}_0.png`)
                        }
                    }
                    else{
                        imageString=images(`./${pokemonSpecies.id}_${varietyIndex}_${gender_options[i]}_${gmaxString}_0_s.png`)
                    }
                }
                break
            }
            catch{

            }
        }
        return imageString
    }
 
    return (
        <div className="pokemon-img">
            <img src={getImage()} alt={pokemonSpecies.name} width={size} height={size}/>
        </div>
    )
}

export default PokemonImage