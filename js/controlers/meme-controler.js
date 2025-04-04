'use strict'

var gElCanvas
var gCtx

// init the canvas board
function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
}

function onClick(ev) {
    whenBoardClick(ev)
}

// add img to the canvas
function renderMeme() {
    let meme = getMeme()

    meme.img.onload = () => {
        const container = document.querySelector('.canvas-container')

        gElCanvas.width = container.clientWidth
        gElCanvas.height = container.clientHeight

        gCtx.drawImage(meme.img, 0, 0, gElCanvas.width, gElCanvas.height)

        renderLines(gMeme)
    }
}

// render line to the canvas
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

    let frameX

    switch (meme.align) {
        case 'left':
            frameX = x
            break;
        case 'right':
            frameX = x - textWidth
            break;
        case 'center':
        default:
            frameX = x - textWidth / 2
            break
    }

    gCtx.strokeStyle = '#00000f'
    gCtx.lineWidth = 2
    gCtx.strokeRect(
        frameX - padding,
        y - textHeight / 2 - padding,
        textWidth + padding * 2,
        textHeight + padding * 2
    )
    console.log(gCtx.strokeRect)
}

// changing font family
function onChangeFontFamily(th) {
    changeFontFamily(th)
}

// change align text 
function onChangeAlignText(th) {
    changeAlignText(th.value)
}

// cal to text top
function onTextTop(th) {
    textTop(th.value)
}

// cal to text bottom
function onTextBottom(th) {
    textBottom(th.value)
}

// call to delete line
function onDeleteLine() {
    deleteLine()
}

// save meme to local storage
function onSaveMeme() {
    saveMeme()
}

// change the img to url  
function canvasToUrl() {
    return gElCanvas.toDataURL()
}

// render save memes
function renderSavedMemes() {
    let savedMemes = getFromStorage()
    renderSavedImgs()
    if (!savedMemes || savedMemes.length === 0) return []
    return savedMemes.map(meme => meme.line)
}

// call to add emoji
function onAddSticker(emoji) {
    addSticker(emoji)
}

// call to upload img
function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')
    uploadImg(canvasData)
}

// open facebook
function onUploadToFB(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

// render btns to the html
function uploadSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
        <a href="${uploadedImgUrl}" target="_blank">link</a>
        <button class="btn-facebook" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
           share to FB
        </button> `
}

