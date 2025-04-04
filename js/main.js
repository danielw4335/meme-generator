'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    initCanvas()
    renderGallery()
    renderKeywords()
    window.addEventListener('resize', resizeCanvas)
}

// move to meme page
function onMemesClick() {
    let gallery = document.querySelector('.gallery-container')
    gallery.classList.add('hidden')

    let memes = document.querySelector('.memes-container')
    memes.classList.remove('hidden')
}


// move to gallery page
function onGalleryClick() {
    renderGallery()
    let memes = document.querySelector('.memes-container')
    memes.classList.add('hidden')

    let gallery = document.querySelector('.gallery-container')
    gallery.classList.remove('hidden')
}

// render canvas siae
function resizeCanvas() {
    const container = document.querySelector('.canvas-container')
    gElCanvas.width = container.clientWidth
    gElCanvas.height = container.clientHeight

    if (gMeme && gMeme.selectedImgId !== 0) {
        const imgSrc = gImgs[gMeme.selectedImgId - 1].url
        const img = new Image()
        img.onload = function () {
            const ratio = img.height / img.width
            gElCanvas.height = gElCanvas.width * ratio
            renderMeme()
        }
        img.src = imgSrc
    } else {
        gElCanvas.height = gElCanvas.width * 0.75
    }
}


