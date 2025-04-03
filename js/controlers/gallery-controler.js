'use strict'
var gIsSaved = false
// render al gallery pictures
function renderGallery() {
    const strHTMLS = gImgs.map(img => `
<img src=${img.url} id="${img.id}" onclick="onImgSelect(${img.id})" />
`)
    document.querySelector('.gallery-img').innerHTML = strHTMLS.join('')
}

// call to set img
function onImgSelect(id) {
setImg(id)
}

// call to random meme
function onRandomMeme() {
    randomMeme()
}

// render imgs from local storage
function renderSavedImgs() {
     let iMgs = getFromStorage()
     let strHTMLS = iMgs.map((meme, index) =>  `
                    <img src="${meme.imgData}" id="saved-${index}" onclick="loadSavedMeme(${index})" />   `)
            document.querySelector('.gallery-img').innerHTML = strHTMLS.join('')     
}
