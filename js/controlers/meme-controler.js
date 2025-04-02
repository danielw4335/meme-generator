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
        renderLines(gMeme)
    }
}

function renderLines(gMeme) {
    gMeme.lines.forEach(meme => {
        let x = meme.pos.x
        let y = meme.pos.y
        gCtx.lineWidth = 0.1
        gCtx.strokeStyle = 'red'
        gCtx.fillStyle = meme.color
        gCtx.font = `${meme.size}px Arial`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'
        gCtx.fillText(meme.txt, x, y)
        gCtx.strokeText(meme.txt, x, y)
        if(meme.isSelected)drawFrame(gMeme)
    })


}

// btn download
function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    console.log('dataUrl:', dataUrl)
    elLink.href = dataUrl
    // Set a name for the downloaded file
    elLink.download = 'my-meme'
}

// set Font color
function onChangeColor(ev) {
    console.log('color', ev.target.value)
    let color = ev.target.value
    setLineColor(color)
}

// set Font Size
function onCangeFontSize(bool) {
    setFontSize(bool)
    // console.log(bool)
}

// add new line
function onAddLine() {
    addLine()
}

// change select line
function onCangeSelectLine() {
    changeSelectLine()
}

// draw frame to the select line
function drawFrame(gMeme) {
    let meme = gMeme.lines[gMeme.selectedLineIdx]
    if (!meme.txt || meme.txt.trim() === '') return
    let y = meme.pos.y
    let x = meme.pos.x
    const metrics = gCtx.measureText(meme.txt)
    const textWidth = metrics.width
    const textHeight = meme.size * 1.2
    const padding = 10
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2

    gCtx.strokeRect(
        x - textWidth / 2 - padding,
        y - textHeight / 2 - padding,
        textWidth + padding * 2,
        textHeight + padding * 2)

}
