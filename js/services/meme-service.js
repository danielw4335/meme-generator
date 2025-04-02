'use strict'
// varaible
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}

// find img by idx
function getMeme(imgId) {
    let imgSrc = gImgs[imgId].url
    let img = new Image()
    img.src = imgSrc
   return img
}

// change text line
function setLineTxt(txt) {
    console.log(gMeme.lines[0].txt)
    gMeme.lines[0].txt = txt
    console.log(gMeme.lines[0].txt)
    renderMeme()
}

function setImg(imgIdx) {
    renderMeme()
}