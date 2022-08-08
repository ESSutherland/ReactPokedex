import React, {useState, useEffect} from "react";

function PokemonStat({amount, stat, getResource}){

    const [statName, setStatName] = useState('')

    useEffect(() => {
        getResource(stat.url).then((s) => {
            getStatName(s)
        })
    }, [])

    function getStatName(statObj){
        statObj.names.forEach((n) => {
            if (n.language.name === 'en'){
                let sName = n.name.replace('Special', 'Sp.')
                setStatName(sName)
            }
        })
    }

    return(
        <div className="stat">
            <div className="stat-name">{statName} :</div> <div className="full-bar"><div className="stat-bar" style={{width: `${amount}px`}}></div></div> <div className="stat-amount">{amount}</div>
        </div>
    )
}

export default PokemonStat