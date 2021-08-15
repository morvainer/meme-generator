'use strict';


var gCanvas;
var gCtx;
var gAddBtnClickCount = 0;

function init() {
    renderGallery();
}


function renderGallery() {
    
    var strHtml = `<div class="main-gallerypage-layout">
    <header class="gallery-header"><img src="img/Icons/LOGO.png" height="25" width="120"/></header>
    <nav class="nav-bar"></nav>
    <div class="gallery">
   </div>`;
    var strHtmlFooter=` <footer class="gallery-footer"></footer>`;
    var elMainPage = document.querySelector('.main-page');
    elMainPage.innerHTML = strHtml;

    var strHtmls = gImgs.map(function (img) {
        return `<div class="img${img.id} gallery-img" ><img src="${img.url}" onclick="onCreateMeme(${img.id})" height="100" width="100" /></div>
                
  `
    });

    var elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHtmls.join('')+ strHtmlFooter;

    
}



function renderEditor(imgId) {
        
    var strHtml = ` <div class="main-grid grid main-layout">
    <header class="controller-header"><img src="img/Icons/LOGO.png" height="25" width="120"/><div class="gallery-btn" onclick="renderGallery()" ><span class="gallery-btn-txt"> Gallery</span> </a></div> </header>
    <div class="canvas-container">
    <img class="blankImage" src="img/${imgId}.jpg" width="553" height="543"/>
    <canvas id="my-canvas" height="543" width="553"></canvas>
    </div>
    <div class="control-box grid">
            <input class="txt-box" name="newTxt" type="text" placeholder="Type your text here" />
            <div class="iconBtnHolder switch-btn" onclick="onSwitchLine()"><img class="iconBtn" src="img/Icons/switchBtn.png" height="60" width="60"/></div>
            <div class="iconBtnHolder add-btn" onclick="onAddText('text')"><img class="iconBtn" src="img/Icons/add.png" height="60" width="60"/></div>
            <div class="iconBtnHolder clear-btn" onclick="onDeleteLine()"><img class="iconBtn" src="img/Icons/trash.png" height="60" width="60"/></div>
           
            <div class="iconBtnHolder inc-btn" onclick="onChangeFontSize(1)"><img class="iconBtn" src="img/Icons/increase font - icon.png" height="60" width="60"/></div>
            <div class="iconBtnHolder dec-btn" onclick="onChangeFontSize(0)"><img class="iconBtn" src="img/Icons/decrease font - icon.png" height="60" width="60"/></div>
            <div class=" iconBtnHolder arrow-up-Btn arrowBtn" onclick="onChangeTxtPos(1)"><i class="fas fa-arrow-up"></i></div>
            <div class=" iconBtnHolder arrow-down-Btn arrowBtn" onclick="onChangeTxtPos(0)"><i class="fas fa-arrow-down"></i></div>
            <section class="fontfamily-section">
        <select class="fontfamily-list" onchange="onSetFontFamily(this.value)">
            <option value="Impact">Impact</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
        </select>
        </section>

        <div class="color-input-div">
        <input onchange="onSetTxtColor(this)" type="color" class="input-txt-color" id="color" name="color"
        value="#FFFFFF"/>
        <label for="color"><img class="iconBtn txt-color-icon" src="img/Icons/txtcolor.png" height="60" width="60"/></label>
        </div>

        <div class="strokecolor-input-div">
        <input onchange="onSetStrokeColor(this)" type="color" class="input-txtstroke-color" id="stroke-color" name="stroke-color"
        value="#000000" />
        <label for="stroke-color" ><img class="iconBtn stroke-color-icon" src="img/Icons/text stroke.png" height="60" width="60"/></label>
        </div>

        <div class="iconBtnHolder leftalign-btn" onclick="onAlignText('left')"><img class="iconBtn" src="img/Icons/align-to-left.png" height="60" width="60"/></div>
        <div class="iconBtnHolder centeralign-btn" onclick="onAlignText('center')"><img class="iconBtn" src="img/Icons/center-text-alignment.png" height="60" width="60"/></div>
        <div class="iconBtnHolder rightalign-btn" onclick="onAlignText('right')"><img class="iconBtn" src="img/Icons/align-to-right.png" height="60" width="60"/></div>
        <div class="download-btn"><a href="#" onclick="onDownloadImg(this)" download="myphoto"><span class="download-btn-txt"> Download</span> </a></div>  
          
            </div>
            <footer><img src="img/Icons/LOGO.png" height="25" width="120"/></footer>
            </div>

    `
    var elMainPage = document.querySelector('.main-page');
    elMainPage.innerHTML = strHtml;

}
function onDeleteLine() {
    deleteLine();
    gMeme.selectedLineIdx = 0;
    if (gMeme.lines.length === 0) {
        gAddBtnClickCount = 0;

    } else {
        gAddBtnClickCount--;
    }
    clearCanvas();
    renderLines();
    if(gMeme.lines.length>0){

        drawRectWithTxtWidth();
    }

}


function onSetTxtColor(elInput) {
    gMeme.lines[gMeme.selectedLineIdx].color = elInput.value;
    clearCanvas();
    renderLines();
    drawRectWithTxtWidth();

}

function onSetStrokeColor(elInput) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = elInput.value;
    clearCanvas();
    renderLines();
    drawRectWithTxtWidth();

}

function onAlignText(alignType) {
    var txtWidth = measureTxt(gMeme.lines[gMeme.selectedLineIdx].txt);
    if (alignType === 'left') {
        gMeme.lines[gMeme.selectedLineIdx].pos.x = 20;
    }
    else if (alignType === 'center') {
        gMeme.lines[gMeme.selectedLineIdx].pos.x = (gCanvas.width / 2) - (txtWidth / 2);

    } else {
        gMeme.lines[gMeme.selectedLineIdx].pos.x = (gCanvas.width - (txtWidth + 20));
    }
    clearCanvas();
    renderLines();
    drawRectWithTxtWidth();
}

function onAddText() {
    var elTxt = document.querySelector('[name=newTxt]');
    var txt = elTxt.value;
    if (!txt) return;
    addTextToMeme(txt);
    elTxt.value = '';


}


function onSwitchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx++;
    }

    clearCanvas();
    renderLines();
    drawRectWithTxtWidth();  
}

function drawRectWithTxtWidth(){
    var line = gMeme.lines[gMeme.selectedLineIdx];
    var x = line.pos.x;
    var y = line.pos.y;
    var txt = gMeme.lines[gMeme.selectedLineIdx].txt;
    var txtMeasure = gCtx.measureText(txt);
    var txtWidth = txtMeasure.width;
    var txtHeight = line.height;
    var yChange = gMeme.lines[gMeme.selectedLineIdx].yChange;
    drawRect(x - 5, y + yChange, txtWidth + 20, txtHeight);

}

function onSetFontFamily(fontfamily) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontfamily;
    clearCanvas();
    renderLines();
    drawRectWithTxtWidth();
}

function onChangeFontSize(num) {
    var fontSize = num ? 10 : -10;
    gMeme.lines[gMeme.selectedLineIdx].size += fontSize;
    gMeme.lines[gMeme.selectedLineIdx].height += fontSize;
    gMeme.lines[gMeme.selectedLineIdx].yChange += (-fontSize);

    
    clearCanvas();
    renderLines();
    drawRectWithTxtWidth();
    
    var x = gMeme.lines[gMeme.selectedLineIdx].pos.x;
    var y = gMeme.lines[gMeme.selectedLineIdx].pos.y;
    var line = gMeme.lines[gMeme.selectedLineIdx];
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt, x, y, line);

}

function onChangeTxtPos(num) {
    var txtPosChange = num ? -10 : 10;
    gMeme.lines[gMeme.selectedLineIdx].pos.y += txtPosChange;
    var newY = gMeme.lines[gMeme.selectedLineIdx].pos.y;
    var x = gMeme.lines[gMeme.selectedLineIdx].pos.x;
    var line = gMeme.lines[gMeme.selectedLineIdx];
    clearCanvas();
    renderLines();
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt, x, newY, line);
    drawRectWithTxtWidth();


}

function renderLines() {
    
    var lines = gMeme.lines.map(function (line) {
        drawText(line.txt, line.pos.x, line.pos.y, line);
    });
  
}



function onCreateMeme(imgId) {
    gMeme.selectedImgId = imgId;
    renderEditor(imgId);
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners();
}


function onDownloadImg(elLink) {
    drawImg();
    renderLines();
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
