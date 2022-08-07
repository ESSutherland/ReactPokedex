import React, {useState, useEffect} from "react";
import PokemonScrollPane from "./PokemonScrollPane";

function PokemonScrollBar({pokemonList, setPokeId, pokeId}){

    const [isLoading, setIsLoading] = useState(true)

    //console.log(pokemonList)


    // const getPokeList = async() => {
    //     let pList = pokemonList.map(async(pokemon) => {
    //         const p = await getResource(pokemon.url)
    //         return p
    //     })
    //     return Promise.all(pList)
    // }

    // useEffect(() => {
    //     getPokeList().then(() => {
    //         getPokeList().then((list) => {
    //             setPokeList(list)
    //             setIsLoading(false)
    //         })
    //     })
    // }, [pokeList])

    useEffect(() => {
        setIsLoading(false)
    },[pokemonList])

    return(
        <div>
            {
                isLoading ?
                <div>LOADING</div>
                :
                <div className='scroll-container'>
                {
                    // pokeList.map((poke) => {
                    //     console.log(poke)
                    //     return <PokemonScrollPane pokemon={poke} setPokeId={setPokeId} key={poke.id}/>
                    // })

                    pokemonList.map((value, index) => {
                        return <PokemonScrollPane setPokeId={setPokeId} pokemon={value} pokemonId={index+1} dataKey={index+1} pokeId={pokeId} key={index+1}/>
                    })

                }
                </div>
            }
        </div>
    )
}

export default PokemonScrollBar