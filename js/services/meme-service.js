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

// find meme by idx
function getMeme() {
 let line = gMeme.lines[gMeme.selectedLineIdx]
 let imgSrc = gImgs[gMeme.selectedImgId-1].url
let img = new Image()
img.src = imgSrc
return {img, line}
}

// change change selectidx of line
function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    renderMeme()
}

// change selectidx of img
function setImg(imgIdx) {
    gMeme.selectedImgId = imgIdx
    renderMeme()
}