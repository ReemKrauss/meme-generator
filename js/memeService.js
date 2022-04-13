'use strict'
let gMeme
let gCurrFill = 'white'
let gCurrStroke = 'black'
let gCurrFont = 'impact'




function resetMemeValues() {
    gMeme = {
        selectedImg: 0,
        selectedLine: 0,
        imgSticker: 0,
        lines: [{
            txt: 'Your text',
            font: 'impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            size: 40,
            pos: { x: 200, y: 55 },
        },
        {
            txt: 'Your text',
            font: 'impact',
            align: 'center',
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

function updateLineTxt(txt) {
    if (gMeme.selectedLine < 0) {
        gMeme.selectedLine = gMeme.lines.length - 1;
    }
    gMeme.lines[gMeme.selectedLine].txt = txt;
}

function toggleLines() {
    deleteEmptyLine()
    if (!gMeme.lines.length) return;
    if (gMeme.selectedLine === gMeme.lines.length - 1) {
        gMeme.selectedLine = 0;
        return gMeme.lines[gMeme.selectedLine].txt;
    }
    gMeme.selectedLine++;
    return gMeme.lines[gMeme.selectedLine].txt;
}

function deleteEmptyLine() {
    if (!gMeme.lines.length) return
    if (!gMeme.lines[gMeme.selectedLine].txt) {
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
    if (linesCount === 1) {
        y = 360;
        if (gMeme.lines[0].pos.y === 360) y = 55
    }
    if (linesCount > 1) y = canvasH / 2;
    const newLine = {
        txt: 'Your text',
        font: gCurrFont,
        align: 'center',
        fill: gCurrFill,
        stroke: gCurrStroke,
        size: 40,
        pos: { x: canvasW / 2, y },
    };
    return newLine;
}

function moveLine(val) {
    var idx = gMeme.selectedLine;
    // val *= 6;
    console.log(val);
    if (idx >= 0) {
        gMeme.lines[idx].pos.y += val;
        return;
    }
}

function changeFontSize(size) {
    const idx = gMeme.selectedLine
    const currLine = gMeme.lines[idx]
    if (idx < 0) return;
    if (size > 0 && currLine.size > 100) return
    if (size < 0 && currLine.size < 10) return
    gMeme.lines[idx].size += size
}

function changeAlign(key, canvasW) {
    var idx = gMeme.selectedLine;
    if (idx < 0) return;
    const line = gMeme.lines[idx];
    line.align = key;
    if (key === 'left') line.pos.x = 10;
    else if (key === 'right') line.pos.x = canvasW - 10;
    else line.pos.x = canvasW / 2;
}

function setColor(color) {
    gCurrFill = color
    const idx = gMeme.selectedLine;
    if (idx < 0) return;
    gMeme.lines[idx].fill = color;
}
function changeFont(val){
    gCurrFont = val
    const idx = gMeme.selectedLine;
    if (idx < 0) return;
    gMeme.lines[idx].font = val;
}