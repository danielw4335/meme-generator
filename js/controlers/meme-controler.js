'use strict'

var gElCanvas
var gCtx

// init the canvas board
function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx:', gCtx)
}

function onClick(ev) {
    whenBoardClick(ev)
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
        console.log('x line, y line:', x, y)
        gCtx.lineWidth = 0.1
        gCtx.strokeStyle = 'red'
        gCtx.fillStyle = meme.color
        gCtx.font = `${meme.size}px ${meme.font}`
        gCtx.textAlign = `${meme.align}`
        gCtx.textBaseline = 'middle'
        gCtx.fillText(meme.txt, x, y)
        gCtx.strokeText(meme.txt, x, y)
        setPosFrameLine(meme, x, y)
        if (meme.isSelected) lineIsSelect(gMeme)
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

// when line is selected change btns and inputs to her value and draw frame
function lineIsSelect(gMeme) {
    let meme = gMeme.lines[gMeme.selectedLineIdx]
    document.querySelector('.inputTxt').value = `${meme.txt}`
    document.querySelector('.color-line').value = `${meme.color}`

    if (!meme.txt || meme.txt.trim() === '') return
    let y = meme.pos.y
    let x = meme.pos.x
    const metrics = gCtx.measureText(meme.txt)
    const textWidth = metrics.width
    const textHeight = meme.size * 1.2
    const padding = 10
    gCtx.strokeStyle = '#00000f'
    gCtx.lineWidth = 2
    gCtx.strokeRect(
        x - textWidth / 2 - padding,
        y - textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2
    )
    console.log(gCtx.strokeRect)
}

// changing font family
function onChangeFontFamily(th){
// console.log(th.value)
changeFontFamily(th)
}

function onChangeAlignText(th) {
    changeAlignText(th.value)
}

function onTextTop(th) {
    textTop(th.value)
}
function onTextBottom(th) {
    textBottom(th.value)
}

function onDeleteLine() {
    deleteLine()
}

// !_____________________
//?? function getEvPos(ev) {
//     const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }

//     if (TOUCH_EVS.includes(ev.type)) {
//         ev.preventDefault()

//         ev = ev.changedTouches[0]

//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//         }
//     }
//     return pos
//?? }