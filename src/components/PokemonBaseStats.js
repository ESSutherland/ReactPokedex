import React from "react";
import PokemonStat from "./PokemonStat";

function PokemonBaseStats({pokemon, getResource}){

    return(
        <div className="base-stats">
        <div className="ability-title">Base Stats</div>
        {
            pokemon.stats.map((stat) => {
                return <PokemonStat amount={stat.base_stat} stat={stat.stat} getResource={getResource} key={stat.stat.name}/>
            })
        }
        </div>
    )
}

export default PokemonBaseStats