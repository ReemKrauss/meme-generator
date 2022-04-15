'use strict'
let gCanvas
let gCtx
let gCurrSize = 1
let gStartPos
const gMemeImg = new Image()
let gMemeLoaded = false



function clickedImg(imgURL) {
    gMemeLoaded = false
    swicthContent()
    resetMemeValues()
    document.querySelector('.meme-line').value = 'Your text'
    setMeme(imgURL)
    gCanvas = document.getElementById('main-canvas')
    gCtx = gCanvas.getContext('2d')
    addEvListeners()
    resizeCanvas()
    renderMeme()
    onAddLine()
}

function addEvListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        
        renderMeme()
    })
}
function resizeCanvas() {
    let targetW = (window.innerWidth<980) ? window.innerWidth*0.6 : window.innerWidth*0.4
    let width = Math.max(270,targetW)
    gCanvas.width = width
    gCanvas.height = gCanvas.width;
    // gCanvas.height = elContainer.offsetHeight
}

function renderMeme() {
    if(!gMemeLoaded){
        const imgURL = getMeme().selectedImg
        gMemeImg.src = imgURL
        gMemeImg.onload = () => {
            gCtx.drawImage(gMemeImg, 0, 0, gCanvas.width, gCanvas.height)
            setLinesTxt()
            gMemeLoaded=true
        }
    }else{
        gCtx.drawImage(gMemeImg, 0, 0, gCanvas.width, gCanvas.height)
        setLinesTxt()
    } 
}

function setLinesTxt() {
    const meme = getMeme()
    let lines = meme.lines
    lines.forEach((line) => drawLine(line))
    const line = getSelectedLine()
    if(!line) return
    drawRect(line)
}

function drawLine(line) {
    gCtx.textAlign = line.align
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.strokeStyle = line.stroke
    gCtx.lineWidth = 2;
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
    setLineRectPos()

}

function onupdteLineTxt(txt) {
    updateLineTxt(txt)
    renderMeme()
}

function onToggleLines() {
    let line = toggleLines()

    console.log(line);
    document.querySelector('.meme-line').value = line.txt
    drawRect(line)
    renderMeme()
}
function onAddLine() {
    addNewLine(gCanvas.width, gCanvas.height)
    document.querySelector('.meme-line').value = 'Your text'
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
    if (key === 'left') changeAlign(-6);
    if (key === 'right') changeAlign(6);
    if (key === 'center') changeAlignCenter(gCanvas.width)
    renderMeme();
}

function onSelectColorFill(val) {
    setColorFill(val);
    renderMeme();
}
function onSelectColorStroke(val) {
    setColorStroke(val);
    renderMeme();
}

function onChangeFont(val) {
    changeFont(val)
    renderMeme()
}
function onDown(ev){
    ev.preventDefault()
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    renderMeme()
    setlineDrag(true)
    gStartPos = pos
    gCanvas.style.cursor = 'grabbing'
}
function onMove(ev){
    const line = getSelectedLine()
    if(!line) return
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLinePos(dx, dy)
    gStartPos = pos
    renderMeme()
}
function onUp(ev){
setlineDrag(false)
gCanvas.style.cursor = 'default'
}
function onDownload() {
    const elLink = document.querySelector('.download')
    delSelctedLine();
    renderMeme();
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}