'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics', 'leader', 'speech'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dogs', 'puppies', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'sleep', 'adorable'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'sleep', 'relaxed'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'victory', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['meme', 'expression', 'humor'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'surprise', 'adorable'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'expression', 'humor'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'smile', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['celebrity', 'smile', 'politics'] },
    { id: 11, url: 'img/11.jpg', keywords: ['sports', 'basketball', 'action'] },
    { id: 12, url: 'img/12.jpg', keywords: ['gesture', 'expression', 'humor'] },
    { id: 13, url: 'img/13.jpg', keywords: ['celebrity', 'charm', 'toast'] },
    { id: 14, url: 'img/14.jpg', keywords: ['action', 'matrix', 'cool'] },
    { id: 15, url: 'img/15.jpg', keywords: ['celebrity', 'gesture', 'humor'] },
    { id: 16, url: 'img/16.jpg', keywords: ['expression', 'leader', 'politics'] },
    { id: 17, url: 'img/17.jpg', keywords: ['meme', 'aliens', 'humor'] },
    { id: 18, url: 'img/18.jpg', keywords: ['toy story', 'buzz', 'animation'] },
    { id: 19, url: 'img/00100.webp', keywords: ['toy story', 'buzz', 'animation'] }
]


// get random meme
function randomMeme() {
    if (!gImgs || gImgs.length === 0) return null
    const id = getRandomInt(gImgs.length)
    onImgSelect(id)
}

function setfilterImg(txt) {
    if (!txt) return gImgs

    txt = txt.toLowerCase()
    let filteredImages = gImgs.filter(img =>
        img.keywords.some(keyword => keyword.toLowerCase().includes(txt))
    )
    console.log(filteredImages)
    if(!filteredImages.length) filteredImages = [{id: 19, url: 'img/00100.webp'}]
    return filteredImages
}

