'use strict'

// render al gallery pictures
function renderGallery() {
let strHTMLS = `
<img src=${gImgs[0].url} onclick="onImgSelect(this)" />
<img src=${gImgs[0].url} onclick="onImgSelect(this)" />
`
let gallery = document.querySelector('.gallery-container').innerHTML = strHTMLS
// console.log(gallery)
}

// function onImgSelect(this) {
// setImg() 
// }
