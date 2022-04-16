'use strict'


function init() {
    renderGallery()
}


function renderGallery() {
    let imgs = getImgs()
    let strHTML = ''
    imgs.forEach(img => {
        strHTML += `<img class="img" src="${img.url}" onclick="clickedImg('${img.url}',this)" />`
    })
    document.querySelector('.gallery-imgs').innerHTML = strHTML
}

function onImgInput(ev) {


    const reader = new FileReader()

    reader.onload = (event) => {
        console.log('onload')
        const img = new Image()
        img.onload = function () {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.height = img.naturalHeight
            canvas.width = img.naturalWidth
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const url = canvas.toDataURL('image/jpeg')
            clickedImg(url, img)
        }
        img.src = event.target.result
    }
    console.log('after')
    reader.readAsDataURL(ev.target.files[0])

}