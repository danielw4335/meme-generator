'use strict'

var gElCanvas
var gCtx

// init the canvas board
function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx:', gCtx)
    renderMeme()
}

// add img to the canvas
function renderMeme() {
   let img = getMeme(0)
// console.log(typeof img)
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    }
}

// add txt to canvas
function renderText() {
    let x = 190
    let y = 150
    let line = gMeme.lines[0]
    // console.log(line)
    // console.log(gCtx)
    // console.log( typeof line.size )
    gCtx.lineWidth = 0.1
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}
