'use strict'
var gIsSaved = false



// render all gallery pictures
function renderGallery(txt) {
    let img = setfilterImg(txt)
    const strHTMLS = img.map(img => `
<img src=${img.url} id="${img.id}" onclick="onImgSelect(${img.id})" />
`)
    document.querySelector('.gallery-img').innerHTML = strHTMLS.join('')
}

// call to set img
function onImgSelect(id) {
    setImg(id)
}

function onSaveImgSelect(id){
setSaveMeme(id)
}

// call to random meme
function onRandomMeme() {
    randomMeme()
}

// render imgs from local storage and hidden memes editor
function renderSavedImgs() {
    let memes = document.querySelector('.memes-container')
    memes.classList.add('hidden')

    let gallery = document.querySelector('.gallery-container')
    gallery.classList.remove('hidden')

    let iMgs = getFromStorage()
    console.log(iMgs)
    let strHTMLS = iMgs.map((meme, index) => `
    <img src="${meme.imgData}" id="saved-${meme.id}" onclick="onSaveImgSelect(${meme.id},${index})" /> `)
    document.querySelector('.gallery-img').innerHTML = strHTMLS.join('')
    console.log('meme, index:', strHTMLS )
}

// user unput some text to the input
function onSetfilterImg(th) {
    renderGallery(th.value)
}

// user click to clear input
function onClearInput() {
    const elInput = document.getElementById('filtert-txt')
    elInput.value = ''
    renderGallery()
}

// user click on some word
function onKeywordClick(keyword) {
    keywordClick(keyword)
} 

// render all keyWords 
function renderKeywords() {
    const elContainer = document.querySelector('.keywords-container')
    const strHTMLs = Object.entries(gKeywordCount).map(([word, count]) => {
        const fontSize = 12 + count * 2 
        return `<span class="keyword" style="font-size: ${fontSize}px" onclick="onKeywordClick('${word}')">${word}</span>`
    })
    elContainer.innerHTML = strHTMLs.join(' ')
}