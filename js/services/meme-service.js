'use strict'
// varaible

const MEME_KEY = 'memeSAVE'
var gMeme = {
    isFirstRender: true,
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: '#000000',
            align: 'center',
            pos: { x: 200, y: 100 },
            isSelected: false
        },
        {
            txt: 'Lets enter text',
            size: 20,
            color: '#000000',
            align: 'center',
            pos: { x: 200, y: 300 },
            isSelected: false
        }
    ]
}

var gSavedMemes = []

// find meme by idx
function getMeme() {
    let line = gMeme.lines[gMeme.selectedLineIdx]
    let imgSrc = gImgs[gMeme.selectedImgId - 1].url
    let img = new Image()
    img.src = imgSrc
    return { img, line }
}

// change change selectidx of line
function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    renderMeme()
    gMeme.isFirstRender = false

}

// change selectidx of img
function setImg(imgIdx) {
    gMeme.selectedImgId = imgIdx
    gMeme.isFirstRender = true
    renderMeme()
    onMemesClick()
}

// change the line color
function setLineColor(color) {
    console.log(color)
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}

// change font size
function setFontSize(bool) {
    if (bool) gMeme.lines[gMeme.selectedLineIdx].size++
    else gMeme.lines[gMeme.selectedLineIdx].size--
    renderMeme()

}

// add new line
function addLine() {
    const y = 100 + gMeme.lines.length * 20
    gMeme.lines.push({
        txt: 'enter text',
        size: 20,
        color: '#000000',
        align: 'center',
        pos: { x: gElCanvas.width / 2, y },
        isSelected: true
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}

// change select line
function changeSelectLine() {
    let res = gMeme.selectedLineIdx
    gMeme.lines[gMeme.selectedLineIdx].isSelected = false
    if (res >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    renderMeme()
}

// draw frame to the lines 
function drawFrameLine(meme) {
    if (!meme.txt || meme.txt.trim() === '') return
    let y = meme.pos.y
    let x = meme.pos.x
    const metrics = gCtx.measureText(meme.txt)
    const textWidth = metrics.width
    const textHeight = meme.size * 1.2
    const padding = 10
    gCtx.strokeStyle = '#46FF32'
    gCtx.lineWidth = 2
    gCtx.strokeRect(
        x - textWidth / 2 - padding,
        y - textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2
    )
}

// Check if the player clicked on the board
function whenBoardClick(ev) {
    const { offsetX, offsetY } = ev

    const clickedLineIdx = gMeme.lines.findIndex(line => {
        if (!line.frame) return false
        return (
            offsetX >= line.frame.x &&
            offsetX <= line.frame.x + line.frame.width &&
            offsetY >= line.frame.y &&
            offsetY <= line.frame.y + line.frame.height
        )
    })

    if (clickedLineIdx !== -1) {
        gMeme.lines.forEach(line => line.isSelected = false)
        gMeme.selectedLineIdx = clickedLineIdx
        gMeme.lines[clickedLineIdx].isSelected = true
        renderMeme()
    }
}

// set position of lines 
function setPosFrameLine(meme, x, y) {
    const metrics = gCtx.measureText(meme.txt)
    const textWidth = metrics.width
    const textHeight = meme.size * 1.2
    const padding = 10

    let frameX;

    switch (meme.align) {
        case 'left':
            frameX = x
            break
        case 'right':
            frameX = x - textWidth;
            break
        case 'center':
        default:
            frameX = x - textWidth / 2
            break
    }

    let framePos = {
        x: frameX - padding,
        y: y - textHeight / 2 - padding,
        width: textWidth + padding * 2,
        height: textHeight + padding * 2
    }

    meme.frame = framePos
}

// change font family
function changeFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font.value
    renderMeme()
}

// change align text
function changeAlignText(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
    renderMeme()
}

// add to y pos 5px 
function textTop(top) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y -= 5
    renderMeme()
}

// subtract to y pos 5px 
function textBottom(bottom) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += 5
    renderMeme()
}

// delete selected line
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = gMeme.selectedLineIdx = 0
    renderMeme()
}

// save meme to global varaible and to local
function saveMeme() {
    let idImg = gMeme.selectedImgId
    let line = gMeme.lines[gMeme.selectedLineIdx]

    let imgData = canvasToUrl()
    gSavedMemes.push({
        id: idImg,
        line,
        imgData
    })
    saveToStorage(MEME_KEY, gSavedMemes)
}

// pull from storage
function getFromStorage() {
    gSavedMemes = loadFromStorage(MEME_KEY)
    return gSavedMemes
}

// send to controler meme from local storage
function setSaveMeme(id) {
    const savedMemes = getFromStorage()
    const meme = savedMemes.find(m => m.id === id)
    if (!meme) {
        return
    }
    gMeme.selectedImgId = meme.id
    gMeme.lines = [meme.line] 
    gMeme.selectedLineIdx = 0
    gMeme.isFirstRender = true

    onMemesClick()
    renderMeme()
}

// add emoji line to global
function addSticker(emoji) {
    const y = 100 + gMeme.lines.length * 5
    gMeme.lines.push({
        txt: emoji,
        size: 40,
        color: '#000000',
        align: 'center',
        pos: { x: gElCanvas.width / 2, y },
        isSelected: true
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}
