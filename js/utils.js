'use strict';

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function drawImg() {
    var elImg = document.querySelector('.blankImage')
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function measureTxt(txt) {
    var txtMeasure = gCtx.measureText(txt);
    var txtWidth = txtMeasure.width;
    return txtWidth;

}