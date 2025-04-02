'use strict'

var gElCanvas
var gCtx

// init the canvas board
function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx:', gCtx)
}

// add img to the canvas
function renderMeme() {
   let meme = getMeme()
// console.log(meme.line)
    meme.img.onload = () => {
        gElCanvas.height = (meme.img.naturalHeight / meme.img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(meme.img, 0, 0, gElCanvas.width, gElCanvas.height)
       
        let x = 190
        let y = 150
        let line = meme.line
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
}

// add txt to canvas

   

