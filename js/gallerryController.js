'use strict'


function init() {
    renderGallery()
}


function renderGallery() {
    let imgs = getImgs();
    let strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img class="img" src="${img.url}" onclick="clickedImg('${img.url}')" />`
    })
    document.querySelector('.gallery-imgs').innerHTML = strHTML;
}