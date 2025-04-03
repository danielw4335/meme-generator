'use strict'

// render al gallery pictures
function renderGallery() {
    const strHTMLS = gImgs.map(img => `
<img src=${img.url} id="${img.id}" onclick="onImgSelect(${img.id})" />
`)
// console.log(strHTMLS)
    document.querySelector('.gallery-img').innerHTML = strHTMLS.join('')
}

// call to set img
function onImgSelect(id) {
// console.log(id)
setImg(id)
}

function onRandomMeme() {
    randomMeme()
}

function renderSavedMemes() {
    let savedMemes = getFromStorage()
    return filterSavedImg(savedMemes)
}