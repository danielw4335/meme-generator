'use strict'
// varaible

var gMeme = {
    isFirstRender: true,
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'black',
            pos: {x: 200, y: 100},
            isSelected: false
        },
        {
            txt: 'Lets enter text',
            size: 20,
            color: 'black',
            pos: {x: 200, y: 300},
            isSelected: false
        }
    ]
}

// find meme by idx
function getMeme() {
    let line = gMeme.lines[gMeme.selectedLineIdx]
    let imgSrc = gImgs[gMeme.selectedImgId - 1].url
    let img = new Image()
    img.src = imgSrc
   
    return { img, line}
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
}


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
            color: 'black',
            pos: { x: gElCanvas.width / 2, y},
            isSelected: true
        })
        gMeme.selectedLineIdx = gMeme.lines.length - 1
        renderMeme()
}

// change select line
function changeSelectLine() {
    let res = gMeme.selectedLineIdx
    gMeme.lines[gMeme.selectedLineIdx].isSelected = false
    if(res >= gMeme.lines.length-1){
        gMeme.selectedLineIdx = 0
    }else gMeme.selectedLineIdx++
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    renderMeme()
}