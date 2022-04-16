'use strict'
const gKeyWords = {
    funny: 0,
    cat: 0,
    baby: 0,
    happy: 0,
    animal: 0,
    child: 0,
    politics: 0,
    movie: 0,
    sports: 0,
    dog: 0,
    celebrity: 0,
    famous: 0,
    cute: 0,
    animation: 0,
    tv: 0,
}
const gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics', 'funny', 'famous'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'cute', 'animal', 'happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dog', 'baby', 'cute', 'animal', 'happy', 'child'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'cute', 'animal', 'happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['child', 'cute', 'funny'] },
    { id: 6, url: 'img/6.jpg', keywords: ['movie', 'celebrity', 'tv'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'cute', 'funny', 'child'] },
    { id: 8, url: 'img/8.jpg', keywords: ['movie', 'celebrity', 'tv'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'cute', 'funny', 'child'] },
    { id: 10, url: 'img/10.jpg', keywords: ['politics', 'famous', 'funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['sports', 'funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['tv', 'famous'] },
    { id: 13, url: 'img/13.jpg', keywords: ['movie', 'celebrity', 'famous', 'tv'] },
    { id: 14, url: 'img/14.jpg', keywords: ['movie', 'celebrity', 'tv'] },
    { id: 15, url: 'img/15.jpg', keywords: ['movie', 'celebrity', 'famous', 'tv'] },
    { id: 16, url: 'img/16.jpg', keywords: ['movie', 'celebrity', 'famous', 'tv'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics', 'famous'] },
    { id: 18, url: 'img/18.jpg', keywords: ['animation', 'movie'] },
    { id: 19, url: 'img/19.jpg', keywords: ['animation', 'movie'] },
    { id: 20, url: 'img/20.jpg', keywords: ['animation', 'movie'] },
    { id: 21, url: 'img/21.jpg', keywords: ['animation', 'movie'] },
    { id: 22, url: 'img/22.jpg', keywords: ['animation', 'movie'] },
    { id: 23, url: 'img/23.jpg', keywords: ['animation', 'movie'] },
    { id: 24, url: 'img/24.jpg', keywords: ['animation', 'movie'] },
    { id: 25, url: 'img/25.jpg', keywords: ['animation', 'movie'] },
    { id: 26, url: 'img/26.jpg', keywords: ['animation', 'movie'] },
]

function getImgs() {
    return gImgs
}

