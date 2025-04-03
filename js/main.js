'use strict'




var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function onInit() {
    initCanvas()
    renderGallery()
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


