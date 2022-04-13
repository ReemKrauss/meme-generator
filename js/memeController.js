'use strict'
let gCanvas;
let gCtx;
let gCurrSize = 1;
let gCurrColor = 'white';
let gCurrFont = 'impact';





function clickedImg(imgURL) {
    swicthContent()
    resetMemeValues()
    setMeme(imgURL)
    gCanvas = document.getElementById('main-canvas')
    gCtx = gCanvas.getContext('2d')
    addEvListeners()
    renderMeme();
}

function renderMeme() {
    const imgURL = getMeme().selectedImg
    const meme = new Image();
    meme.src = imgURL
    meme.onload = () => {
        // gCurrSize 
        gCtx.drawImage(meme, 0, 0, gCanvas.width, gCanvas.height);
        setLinesTxt();
    }
}

function setLinesTxt() {
    const meme = getMeme();
    let lines = meme.lines;
    lines.forEach((line) => drawLine(line))
}

function drawLine(line) {
    gCtx.textAlign = line.align;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
}

function editMemeLine(val) {
    updateMemeTxt(val, gCanvas.width, gCanvas.height, gCurrColor, gCurrFont);
    renderMeme();
}

function onToggleLines() {
    toggleLines();
    renderMeme();
}
function onAddLine() {
    addNewLine(gCanvas.width, gCanvas.height);
    document.querySelector('[name=meme-line]').value = 'Your text';
    renderMeme();
}