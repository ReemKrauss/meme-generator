'use strict'
let gCanvas
let gCtx
let gCurrSize = 1





function clickedImg(imgURL) {
    swicthContent()
    resetMemeValues()
    document.querySelector('[name=meme-line]').value = 'Your text'
    setMeme(imgURL)
    gCanvas = document.getElementById('main-canvas')
    gCtx = gCanvas.getContext('2d')
    addEvListeners()
    renderMeme()
    onAddLine()
}

function renderMeme() {
    const imgURL = getMeme().selectedImg
    const meme = new Image()
    meme.src = imgURL
    meme.onload = () => {
        gCtx.drawImage(meme, 0, 0, gCanvas.width, gCanvas.height)
        setLinesTxt()
    }
}

function setLinesTxt() {
    const meme = getMeme()
    let lines = meme.lines
    lines.forEach((line) => drawLine(line))
    drawRect(getSelectedLine())
}

function drawLine(line) {
    gCtx.textAlign = line.align
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.strokeStyle = line.stroke
    gCtx.fillStyle = line.fill
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    

}

function drawRect(line) {
    const textWidth = getRectValue(line.txt)
    const textHight = line.size
    gCtx.beginPath()
    gCtx.rect(line.pos.x - textWidth / 2 - 10, line.pos.y - textHight , textWidth + 20, textHight +(textHight/4 ))
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
}

function onupdteLineTxt(txt) {
    updateLineTxt(txt)
    renderMeme()
}

function onToggleLines() {
    let line = toggleLines()
    document.querySelector('[name=meme-line]').value = line.txt
    drawRect(line)
    renderMeme()
}
function onAddLine() {
    addNewLine(gCanvas.width, gCanvas.height)
    document.querySelector('[name=meme-line]').value = 'Your text'
    renderMeme()
}
function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onMoveLines(key) {
    if (key === 'up') moveLine(-6);
    if (key === 'down') moveLine(6);
    renderMeme();
}

function onChangeFontSize(key) {
    if (key === '+') changeFontSize(4);
    else if (key === '-') changeFontSize(-4);
    renderMeme();
}

function onChangeAlign(key) {
    changeAlign(key, gCanvas.width);
    renderMeme();
}

function onSelectColor(val) {
    setColor(val);
    renderMeme();
}

function onChangeFont(val) {
    changeFont(val)
    renderMeme()
}
function onDown(ev){
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setlineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}
function onMove(ev){

}
function onUp(ev){

}
