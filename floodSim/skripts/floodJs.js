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
let dim = 50;
let blockWid = 9;

async function floodFill(ii, jj) {
    let count = 0;
    psuedoQorS = [];
    psuedoQorS.push([ii, jj]);
    while (psuedoQorS.length > 0) {
        let i, j;
        if (wantDfs) {
            let tempCor = psuedoQorS.pop();
            i = tempCor[0]; j = tempCor[1];
        }
        else {
            i = psuedoQorS[0][0]; j = psuedoQorS[0][1];
            psuedoQorS = psuedoQorS.slice(1);
        }
        allPixel[i][j].type = 3;
        allPixel[i][j].color = [100, 255, 100];
        allPixel[i][j].pressed = true;
        ctx.fillStyle = 'rgb(100, 255, 100)';
        ctx.fillRect(allPixel[i][j].x, allPixel[i][j].y, blockWid, blockWid);
        ctx.fillStyle = 'rgb(0, 100, 0)';
        if (works(i-1, j)) {
            psuedoQorS.push([i-1, j]);
            ctx.fillRect(allPixel[i-1][j].x, allPixel[i-1][j].y, blockWid, blockWid);
            allPixel[i-1][j].type = 3;
        }   
        if (works(i+1, j)) {
            psuedoQorS.push([i+1, j]);
            ctx.fillRect(allPixel[i+1][j].x, allPixel[i+1][j].y, blockWid, blockWid);
            allPixel[i+1][j].type = 3;
        }
        if (works(i, j-1)) {
            psuedoQorS.push([i, j-1]);
            ctx.fillRect(allPixel[i][j-1].x, allPixel[i][j-1].y, blockWid, blockWid);
            allPixel[i][j-1].type = 3;
        }
        if (works(i, j+1)) {
            psuedoQorS.push([i, j+1]);
            ctx.fillRect(allPixel[i][j+1].x, allPixel[i][j+1].y, blockWid, blockWid);
            allPixel[i][j+1].type = 3;  
        }
        let spd = document.getElementById('fillspd').value;
        let pause;
        let step;
        if (spd=='Super Slow') {pause = 100; step = 1;}
        else if (spd=='Medium') {pause = 1; step = 1;}
        else if (spd=='Fast') {pause = 1; step = 5;}
        else if (spd=='Almost Instant') {pause = 1; step = 30;}
        else if (spd=='Actually Instant') {pause=1; step=1e7;}
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
    for (let i=0; i<dim; i++) {
        for (let j=0; j<dim; j++) {
            let tmpPix = allPixel[i][j];
            if (tmpPix.type==2) {
                startX = i;
                startY = j;
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.fillRect(tmpPix.x, tmpPix.y, blockWid, blockWid);
            }
        }
    }
    // if(wantDfs) floodFilldfs(startX, startY);
    // else floodFillbfs(startX, startY);
    floodFill(startX, startY);

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
    for (let i=0; i<dim; i++) {
        for (let j=0; j<dim; j++) {
            let tmpPix = allPixel[i][j];
            tmpPix.update();
            ctx.fillStyle = `rgb(${tmpPix.color[0]}, ${tmpPix.color[1]}, ${tmpPix.color[2]})`;
            ctx.fillRect(tmpPix.x, tmpPix.y, blockWid, blockWid);
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
        for (let i=0; i<dim; i++) {
            let temp = [];
            for (let j=0; j<dim; j++) {
                temp.push(new Pixel(i*(500/dim), j*(500/dim)));
            }   
            allPixel.push(temp);
        }
        running = setInterval(dynamic, 1);
    }
    else {
        alert("Wait for fill!");
    }
}
