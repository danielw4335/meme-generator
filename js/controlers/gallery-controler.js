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

function onSetfilterImg(th) {
    renderGallery(th.value)
}

function onClearInput() {
    const elInput = document.getElementById('filtert-txt')
    elInput.value = ''
    renderGallery()
}