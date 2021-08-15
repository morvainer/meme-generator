'use strict';


var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function isLineClicked(clickedPos) {
    const { pos } = gMeme.lines[gMeme.selectedLineIdx];
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2);
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size;
}


function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag;
}
function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx;
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy;

}


function renderCanvas() {
    gCtx.save();
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
    drawImg();
    renderLines();
    gCtx.restore();
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove);
    gCanvas.addEventListener('mousedown', onDown);
    gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove);
    gCanvas.addEventListener('touchstart', onDown);
    gCanvas.addEventListener('touchend', onUp);
}


function onDown(ev) {
    // console.log('mousedown');
    const pos = getEvPos(ev);
    if (!isLineClicked(pos)) return;
    setLineDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing'; 

}
function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}
function onMove(ev) {
    if(gMeme.lines.length>0){
    // console.log('mouseMove');
    const line = getLine();
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        moveLine(dx, dy);
        gStartPos = pos;
        renderCanvas();
        drawRectWithTxtWidth();
    }
}
}
function onUp() {
    // console.log('mouseup');
    setLineDrag(false);
    document.body.style.cursor = 'grab';
}



function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy

}