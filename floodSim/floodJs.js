let cvs;
let ctx;
let mouseX;
let mouseY;
let clicking;
let running;
let drawingBarriers = true;
let filling = false;
let psuedoQorS = [];
let allPixel = [];
let wantDfs = 1;


function currPos(event) {
    if ($('#canv').is(':hover')) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    }
}
function mouseOn(event) {
    if ($('#canv').is(':hover')) {
        clicking = true;
    }
}
function mouseOff(event) {
    if ($('#canv').is(':hover')) {
        clicking = false;
    }
}
document.addEventListener('mousemove', currPos);
document.addEventListener('mousedown', mouseOn);
document.addEventListener('mouseup', mouseOff);

function mouseAffectingPix(x, y, rad=0) {
    let radius;
    if (rad==0) radius = document.getElementById('brush_slider').value;
    else radius = rad;
    if (Math.sqrt(Math.pow(x-mouseX, 2) + Math.pow(y-mouseY, 2)) <= radius) 
        return true;
    return false;
}

function Pixel(pixX, pixY)
{
    this.x = parseInt(pixX);
    this.y = parseInt(pixY);
    this.color = [255, 255, 255];
    this.pressed = false;
    // 3: a barrier or visited square, 2: start square, 1: blank sqaure
    this.type = 1;
    this.update = function()
    {
        if (drawingBarriers) {
            if (mouseAffectingPix(this.x, this.y)) {
                if (clicking) {
                    this.color = [255, 100, 100];
                    this.pressed = true;
                    this.type = 3;
                }
                else if (!this.pressed) {
                    this.color = [255, 225, 225];
                }
            }
            else if (!this.pressed) 
                this.color = [255, 255, 255];   
        }
        else {
            if (mouseAffectingPix(this.x, this.y, 5)) {
                if (clicking) {
                    this.color = [100, 255, 100];
                    this.pressed = true;
                    this.type = 2;
                }
                else if (!this.pressed) {
                    this.color = [225, 255, 225];
                }
            }
            else if (!this.pressed) 
                this.color = [255, 255, 255]; 
        }
    };
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function works(i, j) {
    if (i<0 || i>=50 || j<0 || j>=50) return false; 
    if (allPixel[i][j].type==3) return false;
    return true;
}

async function floodFillbfs(ii, jj) {
    let count = 0;
    psuedoQorS = [];
    psuedoQorS.push([ii, jj]);
    while (psuedoQorS.length > 0) {
        let i = psuedoQorS[0][0];
        let j = psuedoQorS[0][1];
        psuedoQorS = psuedoQorS.slice(1);
        allPixel[i][j].type = 3;
        allPixel[i][j].color = [100, 255, 100];
        allPixel[i][j].pressed = true;
        ctx.fillStyle = 'rgb(100, 255, 100)';
        ctx.fillRect(allPixel[i][j].x, allPixel[i][j].y, 8, 8);
        if (works(i-1, j)) {
            psuedoQorS.push([i-1, j]);
            allPixel[i-1][j].type = 3;
        }
        if (works(i+1, j)) {
            psuedoQorS.push([i+1, j]);
            allPixel[i+1][j].type = 3;
        }
        if (works(i, j-1)) {
            psuedoQorS.push([i, j-1]);
            allPixel[i][j-1].type = 3;
        }
        if (works(i, j+1)) {
            psuedoQorS.push([i, j+1]);
            allPixel[i][j+1].type = 3;
        }
        let spd = document.getElementById('fillspd').value;
        let pause;
        let step;
        if (spd=='Super Slow') {pause = 100; step = 1;}
        if (spd=='Medium') {pause = 1; step = 1;}
        if (spd=='Fast') {pause = 1; step = 5;}
        if (spd=='Instant') {pause = 1; step = 30;}
        if (count%step==0) await sleep(pause);
        count++;
    }
    filling = false;
    if (!filling)
        running = setInterval(dynamic, 1);
}

async function floodFilldfs(ii, jj) {
    let count = 0;
    psuedoQorS = [];
    psuedoQorS.push([ii, jj]);
    while (psuedoQorS.length > 0) {
        let tempCor = psuedoQorS.pop();
        let i = tempCor[0];
        let j = tempCor[1];
        allPixel[i][j].type = 3;
        allPixel[i][j].color = [100, 255, 100];
        allPixel[i][j].pressed = true;
        ctx.fillStyle = 'rgb(100, 255, 100)';
        ctx.fillRect(allPixel[i][j].x, allPixel[i][j].y, 8, 8);
        if (works(i-1, j)) {
            psuedoQorS.push([i-1, j]);
            allPixel[i-1][j].type = 3;
        }
        if (works(i+1, j)) {
            psuedoQorS.push([i+1, j]);
            allPixel[i+1][j].type = 3;
        }
        if (works(i, j-1)) {
            psuedoQorS.push([i, j-1]);
            allPixel[i][j-1].type = 3;
        }
        if (works(i, j+1)) {
            psuedoQorS.push([i, j+1]);
            allPixel[i][j+1].type = 3;
        }
        let spd = document.getElementById('fillspd').value;
        let pause;
        let step;
        if (spd=='Super Slow') {pause = 100; step = 1;}
        if (spd=='Medium') {pause = 1; step = 1;}
        if (spd=='Fast') {pause = 1; step = 5;}
        if (spd=='Instant') {pause = 1; step = 30;}
        if (count%step==0) await sleep(pause);
        count++;
    }
    filling = false;
    if (!filling)
        running = setInterval(dynamic, 1);
}
function fillTime() {
    let startX=0;
    let startY=0;
    for (let i=0; i<50; i++) {
        for (let j=0; j<50; j++) {
            let tmpPix = allPixel[i][j];
            if (tmpPix.type==2) {
                startX = i;
                startY = j;
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.fillRect(tmpPix.x, tmpPix.y, 8, 8);
            }
        }
    }
    if(wantDfs) floodFilldfs(startX, startY);
    else floodFillbfs(startX, startY);

}
function rand() {
    if (allPixel.length>10) {
        for (let i=0; i<50; i++) {
            for (let j=0; j<50; j++) {
                if (Math.random()<0.1) {
                    allPixel[i][j].type = 3;
                    allPixel[i][j].pressed = true;
                    allPixel[i][j].color = [255, 100, 100];
                }
            }
        }
    }
}
function dynamic() {
    $('#barriers').click(function() {
        drawingBarriers=true;
    });
    $('#startingPoint').click(function() {
        drawingBarriers=false;
    });
    $('#beginBfs, #beginDfs').click(function() {
        filling=true;
        wantDfs=1;
    });
    $('#beginBfs, #beginBfs').click(function() {
        filling=true;
        wantDfs=0;
    });


    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(0, 0, 500, 500);
    for (let i=0; i<50; i++) {
        for (let j=0; j<50; j++) {
            let tmpPix = allPixel[i][j];
            tmpPix.update();
            ctx.fillStyle = `rgb(${tmpPix.color[0]}, ${tmpPix.color[1]}, ${tmpPix.color[2]})`;
            ctx.fillRect(tmpPix.x, tmpPix.y, 8, 8);
        }
    }
    if (filling) {
        clearInterval(running);
        fillTime();
    }
}
function initialize() {
    clearInterval(running);
    if (!filling) {
        cvs = document.getElementById("canv");
        ctx = cvs.getContext("2d");
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, 0, 500, 500);
        allPixel = [];
        psuedoQorS = [];
        filling = false;
        drawingBarriers = true;
        for (let i=0; i<50; i++) {
            let temp = [];
            for (let j=0; j<50; j++) {
                temp.push(new Pixel(i*10, j*10));
            }   
            allPixel.push(temp);
        }
        running = setInterval(dynamic, 1);
    }
    else {
        alert("Wait for fill!");
    }
}
