import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import PokemonHeader from './components/PokemonHeader';
import PokemonImage from './components/PokemonImage';
import PokemonType from './components/PokemonType';
import PokemonScrollBar from './components/PokemonScrollBar';
import PokemonHeightWeight from './components/PokemonHeightWeight';
import PokemonForm from './components/PokemonForm';

import load from './images/load.png'
import shiny from './images/shiny.png'

function App() {
  const P = new Pokedex()

  const [isLoading, setIsLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [pokeId, setPokeId] = useState(1)
  const [varietyIndex, setVarietyIndex] = useState(0)
  const [formIndex, setFormIndex] = useState(0)
  const [pokemon, setPokemon] = useState({})
  const [pokemonSpecies, setPokemonSpecies] = useState({})
  const [pokemonGender, setPokemonGender] = useState('both')
  const [types, setTypes] = useState([])
  const [forms, setForms] = useState([])
  const [varieties, setVarieties] = useState([])
  const [isShiny, setIsShiny] = useState(false)
  const [currentForm, setCurrentForm] = useState({})
  const [pokemonList, setPokemonList] = useState([])
  const [formName, setFormName] = useState('')
  const [genusName, setGenusName] = useState('')
  const [evoChain, setEvoChain] = useState('')

  const blocked_forms = ['-rock-star', '-belle', '-pop-star', '-phd', '-libre', '-cosplay', '-totem', 
  '-unknown', '-antique', '-eternal', '-swirl', '-ruby', '-matcha', '-mint', '-lemon',
  '-salted', 'enamorus-therian', 'basculegion-female', '-spiky-eared']

  const getPokemonSpecies = useCallback(async(id) => {
    const poke = await P.getPokemonSpeciesByName(id)
    return poke
  },[pokeId])

  const getResource = async(url) => {
    const r = await P.resource(url)
    return r
  }

  const getTypes = useCallback(async(poke) => {
    const typeList = poke.types.map(async(t) => {
          const type = await P.getTypeByName(t.type.name)
          return type
        })
    return Promise.all(typeList)
  })
  

  const getGender = (species) => {
    if (species.gender_rate === -1){
        setPokemonGender('unknown')
      }
      else if (species.gender_rate === 8){
        setPokemonGender('female-only')
      }
      else if (species.gender_rate === 0){
        setPokemonGender('male-only')
      }
      else{
        if (species.has_gender_differences){
          setPokemonGender('male')
        }
        else{
          setPokemonGender('both')
        }
      }
  }

  const getVarieties = useCallback(async(poke) => {
    let varieties = poke.varieties.map(async(v) => {
      let allowed = true
      for(var i = 0; i < blocked_forms.length; i++){
        if(v.pokemon.name.includes(blocked_forms[i])){
          allowed = false
          break
        }
      }
      if(allowed){
        return v.pokemon.url
      }
    })
    return Promise.all(varieties)
  })

  const getForms = useCallback(async(poke) => {
    let forms = poke.forms.map(async(v) => {
      let allowed = true
      for(var i = 0; i < blocked_forms.length; i++){
        if(v.name.includes(blocked_forms[i])){
          allowed = false
        }
      }
      if(allowed){
        return v.url
      }
    })
    return Promise.all(forms)
  })

  const getEnglishFormName = (nameList) => {
        nameList.forEach((n) => {
            if(n.language.name === 'en'){
                setFormName(n.name)
            }
        })
    }

  const getEnglishGenusName = (nameList) => {
        nameList.forEach((n) => {
            if(n.language.name === 'en'){
                setGenusName(n.genus)
            }
        })
    }

  const setData = (id) => {
    if(id !== pokeId){
      setIsLoading(true)
      setPokeId(id)
      setVarietyIndex(0)
      setFormIndex(0)
      setIsShiny(false)
      setForms([])
      setVarieties([])
      setFormName('')
    }
  }

  const updatePokemon = (id) => {
    setPokeId(id)
    setVarietyIndex(0)
    setFormIndex(0)
  }

  useEffect(() => {
    setIsLoading(true)
    setIsShiny(false)
    setForms([])
    setVarieties([])
    setFormName('')
    getPokemonSpecies(pokeId).then((species) => {
      setPokemonSpecies(species)
      getEnglishGenusName(species.genera)
      getGender(species)
      getResource(species.evolution_chain.url).then((chain) => {
        setEvoChain(chain)
      })
      getVarieties(species).then((pokeList) => {
        pokeList = pokeList.filter((x) => {return x !== undefined})
        setVarieties(pokeList)
        getResource(pokeList[varietyIndex]).then((poke) => {
          setPokemon(poke)
          getForms(poke).then((formList) => {
            formList = formList.filter((x) => {return x !== undefined})
            formList.forEach(element => {
              setForms(current => [...current, element])
            })
            getResource(formList[formIndex]).then((form) => {
              setCurrentForm(form)
              getEnglishFormName(form.names)
              getTypes(form).then((typeList) => {
                setTypes(typeList)
                setIsLoading(false)
                setInitialLoad(false)
              })
            })
          })
        })
      })
    })
    
  }, [pokeId, varietyIndex, formIndex])

  useEffect(() => {
    const interval = {
      offset: 0,
      limit: 905
    }
    P.getPokemonsList(interval).then((list) => {
      setPokemonList(list.results)
    })
  }, [])

  const shinyClass = (isShiny)? 'shiny-button selected' : 'shiny-button'

  return (
    <div className='main'>
      <header className='header'>POKEDEX</header>
      <div className='content'>
      {
        initialLoad ?
        <div className='loading'><img src={load}/></div>
        :
        <div>
          <PokemonScrollBar pokemonList={pokemonList} setPokeId={setData} pokeId={pokeId}/>
          <div>
            {
              isLoading ?
              <div className='loading'><h4><img src={load}/></h4></div>
              :
              <div className='container'>
                <PokemonHeightWeight pokemon={pokemon} getResource={getResource}/>
                <PokemonHeader pokemonSpecies={pokemonSpecies} pokeId={pokeId} maxNum={pokemonList.length} setPokeId={updatePokemon}/>
                <div className='center'>
                  <div className='genus'>{genusName}</div>
                  <div className='types'>
                    {
                      types.map((t) => {
                        return <PokemonType pokemonType={t} key={t.id} />
                      })
                    }
                  </div>
                  <PokemonImage pokemonSpecies={pokemonSpecies} pokemonGender={pokemonGender} varietyIndex={varietyIndex+formIndex} size={300} isShiny={isShiny} form={currentForm}/>
                  
                  <div className={shinyClass} onClick={() => setIsShiny(!isShiny)}>
                    <img src={shiny} alt='shiny' height='30px' width='30px'/>
                  </div>

                  <PokemonForm varieties={varieties} varietyIndex={varietyIndex} forms={forms} formIndex={formIndex} formName={formName} setVarietyIndex={setVarietyIndex} setFormIndex={setFormIndex}/>
      
                </div>
              </div>  
              }
            </div>
        </div>
      }
      </div>
    </div>
  )
}

export default App;
