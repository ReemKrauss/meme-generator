'use strict'
let gMeme



function resetMemeValues() {
    gMeme = {
        selectedImg: 0,
        selectedLine: 0,
        imgSticker: 0,
        lines: [{
            txt: 'Your text',
            font: 'impact',
            align: 'center',
            color: 'white',
            fill: 'white',
            stroke: 'black',
            size: 40,
            pos: { x: 200, y: 55 },
        },
        {
            txt: 'Your text',
            font: 'impact',
            align: 'center',
            color: 'white',
            fill: 'white',
            stroke: 'black',
            size: 40,
            pos: { x: 200, y: 360 },
        }]
    }
    return gMeme;
}
function setMeme(imgURL) {
    gMeme.selectedImg = imgURL;
}
function getMeme() {
    return gMeme
}

function updateMemeTxt(txt, canvasW, canvasH, color, font) {
    if (gMeme.selectedLine < 0) {
        addNewLine(canvasW, canvasH, color, font);
        gMeme.selectedLine = gMeme.lines.length - 1;
    }
    gMeme.lines[gMeme.selectedLine].txt = txt;
}

function toggleLines() {
    deleteEmptyLine()
    if (!gMeme.lines.length) return;
    if (gMeme.selectedLine === gMeme.lines.length - 1) {
        gMeme.selectedLine = 0;
        document.querySelector('[name=meme-line]').value = gMeme.lines[gMeme.selectedLine].txt;
        return;
    }
    gMeme.selectedLine++;
    document.querySelector('[name=meme-line]').value = gMeme.lines[gMeme.selectedLine].txt;
}

function deleteEmptyLine(){
    console.log(gMeme.lines[gMeme.selectedLine].txt);
    if(!gMeme.lines[gMeme.selectedLine].txt){
        deleteLine()
    }
}

function deleteLine() {
    if (!gMeme.lines.length) return
    let idx = gMeme.selectedLine;
    if (idx >= 0) {
        gMeme.lines.splice(idx, 1);
        if (gMeme.lines.length) {
            gMeme.selectedLine = gMeme.lines.length - 1;
            return;
        }
    }
    
    gMeme.selectedLine = gMeme.lines.length - 1;
}


function addNewLine(canvasW, canvasH) {
    deleteEmptyLine()
    let linesCount = gMeme.lines.length;
    const newLine = createNewLine(canvasW, canvasH);
    gMeme.lines.push(newLine);
    gMeme.selectedLine = linesCount++;
}


function createNewLine(canvasW, canvasH) {
    let y = 55;
    const linesCount = gMeme.lines.length;
    if (linesCount === 1){
        y = 360;
        if(gMeme.lines[0].pos.y === 360)y = 55
    }
    if (linesCount > 1) y = canvasH / 2;
    const newLine = {
        txt: 'Your text',
        font: 'impact',
        align: 'center',
        color: 'white',
        fill: 'white',
        stroke: 'black',
        size: 40,
        pos: { x: canvasW / 2, y },
        selectedPos: { x: 0, y: 0 }
    };
    return newLine;
}