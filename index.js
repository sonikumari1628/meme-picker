

import {  catsData  } from './data.js'  //we are importing data from other file called data.js
const emotionRadios = document.getElementById('emotion-radios')    //we have extracted radio buttons here
const getImagebtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highLightCheckedOption )    //here e.target is used to change the selection according to the user selectors it will find the id and show the output

getImagebtn.addEventListener('click', renderCat)

memeModalCloseBtn.addEventListener('click', closeModal)

function closeModal(){
    memeModal.style.display = 'none'
}
function highLightCheckedOption(e)
{
        const radios = document.getElementsByClassName('radio') 
        for(let radio of radios){
            radio.classList.remove('highLight')
        }
        document.getElementById(e.target.id).parentElement.classList.add('highLight')   //here we are adding css property that will highlight the radio button in red color     
 }

 function getMatchingCatsArray(){     //it will returns an array of cat objects that matches the user's criteria
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }   
}

function getSingleCatObject()   //getsinglecatobject will return a single cat object selected from array provided by getmatchingcatsarray
{
    const catsArray = getMatchingCatsArray()
    
    if (catsArray.length === 1){
        return catsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}


function renderCat()            // rendercat will use the cat object provided by getsinglecatobject to create HTML string which it will render it to the DOM
{
    const catObject = getSingleCatObject()
    
    memeModalInner.innerHTML = `
    <img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'
}


function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){                       // for of loop is used to print the array
        for (let emotion of cat.emotionTags){    // another for loop is used to print particular array or object inside one array
            if(!emotionsArray.includes(emotion)) // here we have used includes() method to check whether any duplication is occuting or not.
            {                                    // ! is used in if statement to define if emotion is "not" in emotionsArray then push in emotion.
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){         //html is used to create a input type of radio
        radioItems += 
        `<div class="radio">
        <label for "${emotion}">"${emotion}"</label>
          <input type="radio" 
          id="${emotion}"
          value="${emotion}"
          name="emotions">
          </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)
