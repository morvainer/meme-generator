'use strict';
const KEY = 'linesDB';

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy'] },
{ id: 2, url: 'img/2.jpg', keywords: ['happy'] },
{ id: 3, url: 'img/3.jpg', keywords: ['happy'] },
{ id: 4, url: 'img/4.jpg', keywords: ['happy'] },
{ id: 5, url: 'img/5.jpg', keywords: ['happy'] },
{ id: 6, url: 'img/6.jpg', keywords: ['happy'] },
{ id: 7, url: 'img/7.jpg', keywords: ['happy'] },
{ id: 8, url: 'img/8.jpg', keywords: ['happy'] },
{ id: 9, url: 'img/9.jpg', keywords: ['happy'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        // { txt: 'This is the (first) top line', size: 60, align: 'left', color: 'red', pos: { x: 200, y: 100 }, height: 60, yChange: -53 },
        // { txt: 'This is the (second) bottom line', size: 60, align: 'left', color: 'red', pos: { x: 200, y: 500 }, height: 60, yChange: -53 },
        // { txt: 'This is the (third) middle line', size: 60, align: 'left', color: 'red', pos: { x: 200, y: 250 }, height: 60, yChange: -53 }
    ]
}

var gYPos = 100;
var gIdx = 0



function addTextToMeme(txt) {
    _createLine(txt);
    if (gAddBtnClickCount > 2) {
        return;
    } else {
        gAddBtnClickCount++;
    }
    gMeme.selectedLineIdx = gAddBtnClickCount - 1;
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    var line = gMeme.lines[gMeme.selectedLineIdx];
    var x = line.pos.x;
    var y = line.pos.y;
    clearCanvas();
    renderLines();
    var txtMeasure = gCtx.measureText(txt);
    var txtWidth = txtMeasure.width;
    if (gMeme.selectedLineIdx === 0) {

        gMeme.lines[gMeme.selectedLineIdx].pos.x = (gCanvas.width / 2) - (txtWidth / 2);
        var x = line.pos.x;
        clearCanvas();
        renderLines();
    }
    
    drawRect(x - 10, y - 53, txtWidth + 20, 60);
    _saveLinesToStorage();
}

function drawText(txt, x, y, line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.color;
   
    if (line.fontFamily === 'Impact') {
        gCtx.font = line.size + 'px Impact';
    } else if (line.fontFamily === 'Verdana') {

        gCtx.font = line.size + 'px Verdana';
    } else {
        gCtx.font = line.size + 'px Times New Roman';

    }
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawRect(x, y, txtWidth, txtHeight) {
    gCtx.beginPath()
    gCtx.rect(x, y, txtWidth, txtHeight)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}


function _createLine(txt) {
    if (gMeme.lines.length < 1) {
        gYPos = 100;
    }
    var txtWidth = measureTxt(txt);
    var line = {
        id: gIdx,
        txt,
        size: 60,
        align: 'left',
        color: 'white',
        strokeColor: 'black',
        pos: { x: (gCanvas.width / 2) - (txtWidth / 2), y: gYPos },
        height: 60,
        yChange: -53,
        fontFamily: 'Impact',
        isDrag: false

    }
    gMeme.lines.push(line);

    if (gMeme.lines.length < 2) {
        gYPos += 400;

    } else {
        gYPos = 300;
    }
    gIdx++;
}



function _saveLinesToStorage() {
    saveToStorage(KEY, gMeme.lines);
}


function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    _saveLinesToStorage();
   
}


