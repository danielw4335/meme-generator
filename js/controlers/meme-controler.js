var gElCanvas
var gCtx

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx:', gCtx)
    renderMeme()
}

function renderMeme() {
    let imgSrc = gImgs[0].url
    let img = new Image()
    img.src = imgSrc

    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    renderText()
}

