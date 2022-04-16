'use strict'
let gCanvas
let gCtx
let gStartPos
const gMemeImg = new Image()
let gMemeLoaded = false
let gImgRatio ={width:0,height:0}
let gInitCanvasSize = {width:0,height:0}


function clickedImg(imgURL,img) {
    console.log('url',imgURL)
    gImgRatio ={width:0,height:0}
    gInitCanvasSize = {width:0,height:0}
    gImgRatio.width = img.naturalWidth
    gImgRatio.height = img.naturalHeight
    gMemeLoaded = false
    document.querySelector('.user-msg').innerHTML =''
    document.querySelector('.share-container').innerHTML = ''
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
function resizeCanvas(w,h) {
    const targetW = (window.innerWidth<980) ? window.innerWidth*0.6 : window.innerWidth*0.5
    const width = Math.max(270,targetW)
    const height = (gImgRatio.height*width)/gImgRatio.width
    
    gCanvas.width = w || width
    gCanvas.height = h || height
    // gCanvas.height = elContainer.offsetHeight
}

function renderMeme() {
    if(!gMemeLoaded){
        const imgURL = getMeme().selectedImg
        gMemeImg.src = imgURL
        gMemeImg.onload = () => {
            gInitCanvasSize.height = gCanvas.height
            gInitCanvasSize.width = gCanvas.width
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
    const heightRatio = gCanvas.height/gInitCanvasSize.height
    const widthRatio = gCanvas.width/gInitCanvasSize.width
    const  x = line.pos.x *widthRatio
    const  y = line.pos.y *heightRatio
    let size = line.size * (gCanvas.height *0.0035)
    gCtx.textAlign = line.align
    gCtx.font = `${size}px ${line.font}`
    gCtx.strokeStyle = line.stroke
    gCtx.lineWidth = 2
    gCtx.fillStyle = line.fill
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
    

}

function drawRect(line) {
    const heightRatio = gCanvas.height/gInitCanvasSize.height
    const widthRatio = gCanvas.width/gInitCanvasSize.width
    const  x = line.pos.x *widthRatio
    const  y = line.pos.y *heightRatio
    let size = line.size * (gCanvas.height *0.0035)
    gCtx.font = `${size}px ${line.font}`
    const textWidth = getRectValue(line.txt)
    const textHight = size
    gCtx.beginPath()
    gCtx.rect(x - textWidth / 2 - 10, y - textHight , textWidth + 20, textHight +(textHight/4 ))
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
    setLineRectPos(size)
    
}
function getRectValue(txt) {
    return gCtx.measureText(txt).width
}

function onupdteLineTxt(txt) {
    updateLineTxt(txt)
    renderMeme()
}

function onToggleLines() {
    let line = toggleLines()

    console.log(line)
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
    if (key === 'up') moveLine(-6)
    if (key === 'down') moveLine(6)
    renderMeme()
}

function onChangeFontSize(key) {
    if (key === '+') changeFontSize(4)
    else if (key === '-') changeFontSize(-4)
    renderMeme()
}

function onChangeAlign(key) {
    if (key === 'left') changeAlign(-6)
    if (key === 'right') changeAlign(6)
    if (key === 'center') changeAlignCenter(gCanvas.width)
    renderMeme()
}

function onSelectColorFill(val) {
    setColorFill(val)
    renderMeme()
}
function onSelectColorStroke(val) {
    setColorStroke(val)
    renderMeme()
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
    delSelctedLine()
    resizeCanvas(gMemeImg.naturalWidth,gMemeImg.naturalHeight)
    renderMeme()
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.jpg'
    resizeCanvas()
    renderMeme()
}

function onUploadImg(){
    delSelctedLine()
    resizeCanvas(gMemeImg.naturalWidth,gMemeImg.naturalHeight)
    renderMeme()
    const imgDataUrl = gCanvas.toDataURL("image/jpeg")
    uploadImg(imgDataUrl)
    resizeCanvas()
    renderMeme()
}
function uploadImg(imgDataUrl) {

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerHTML = `<a href="${uploadedImgUrl}" target="_blank">Your photo is available here</a> `

        document.querySelector('.share-container').innerHTML = `
        <a class="edit-button download-btn facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share on facebook   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess)
}