import React from "react";

function PokemonForm({varieties, varietyIndex, forms, formIndex, formName, setVarietyIndex, setFormIndex}){

    let PrevVarClass = ''
    let NextVarClass = ''

    if(varieties.length > forms.length){
        PrevVarClass = (varietyIndex > 0)? 'form-btn' : 'form-btn disabled'
        NextVarClass = (varietyIndex+1 < varieties.length)? 'form-btn' : 'form-btn disabled'
    }
    else{
        PrevVarClass = (formIndex > 0)? 'form-btn' : 'form-btn disabled'
        NextVarClass = (formIndex+1 < forms.length)? 'form-btn' : 'form-btn disabled'
    }

    const nextButton = () =>{
        if(varieties.length > forms.length){
            if(varietyIndex + 1 < varieties.length){
                setVarietyIndex(varietyIndex+1)
            }
        }
        else{
            if(formIndex + 1 < forms.length){
                setFormIndex(formIndex+1)
            }
        }
    }

    const prevButton = () =>{
        if(varieties.length > forms.length){
            if(varietyIndex > 0){
                setVarietyIndex(varietyIndex-1)
            }
        }
        else{
            if(formIndex > 0){
                setFormIndex(formIndex-1)
            }  
        }
    }

    return (
    <div className='form'>
        <div className={PrevVarClass} onClick={prevButton}>{'<'}</div>
        {
            (varieties.length > forms.length)?
            <div className='forms'>{formName} (Form {varietyIndex+1} of {varieties.length})</div>
            :
            <div className='forms'>{formName} (Form {formIndex+1} of {forms.length})</div>
        }
        <div className={NextVarClass} onClick={nextButton}>{'>'}</div>
    </div>
    )
}

export default PokemonForm