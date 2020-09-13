let cvs;
let ctx;
// --------------------------
// Changed by bgrd.js jquery
let mouseX;
let mouseY;
let clicking;
let pause=100, step=1;
let dim = 50;
let blockWid = 9;
//-------------------------

//-------------------------
// Changed by initialize and filling functions
let changingPix; // Interval object when person changing the board (for dynamic)
let filling = false; //Just a flag when filling
// -------------------------

// Changed directly in dynamic function
let drawingMode = "barrier"; // (barrier) (startpoint) (endpoint) (erase)
let wantWhat = "dfs"; // (dfs) (bfs) (shortestpaths)
//---------------------------

let psuedoQorS = []; //holds queue or stack when filling
let allPixel = []; //holds all the pixel object
let dists = []; //holds matrix of distances for shortest paths

async function floodFill(ii, jj) {
    function pushPix(i, j) {
        psuedoQorS.push([i, j]);
        ctx.fillRect(allPixel[i][j].x, allPixel[i][j].y, blockWid, blockWid);
        allPixel[i][j].type = 3;
    }
    let timer = 0;
    psuedoQorS = [];
    psuedoQorS.push([ii, jj]);
    while (psuedoQorS.length > 0) {
        let i, j;
        if (wantWhat=="dfs") {
            let tempCor = psuedoQorS.pop();
            i = tempCor[0]; j = tempCor[1];
        }
        else if (wantWhat=="bfs") {
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
            pushPix(i-1, j);
        }   
        if (works(i+1, j)) {
            pushPix(i+1, j);
        }
        if (works(i, j-1)) {
            pushPix(i, j-1);
        }
        if (works(i, j+1)) {
            pushPix(i, j+1);
        }
        if (timer%step==0) await sleep(pause);
        timer++;
    }
    filling = false;
    if (!filling)
        changingPix = setInterval(dynamic, 1);
}

function goPath(targeti, targetj) {
    function withinBounds(i, j) {
        if (i<0||i>=dim||j<0||j>=dim) return false;
        if (dists[i][j]==-1) return false;
        return true;
    }
    function fillCol(i, j) {
        ctx.fillStyle = 'rgb(120, 90, 255)';
        ctx.fillRect(allPixel[i][j].x, allPixel[i][j].y, blockWid, blockWid);
    }
    let i = targeti, j = targetj;
    fillCol(i, j);
    while (dists[i][j]!=0) {
        let minDist = 1e7;
        if (withinBounds(i-1, j)) minDist = Math.min(minDist, dists[i-1][j]);
        if (withinBounds(i+1, j)) minDist = Math.min(minDist, dists[i+1][j]);
        if (withinBounds(i, j-1)) minDist = Math.min(minDist, dists[i][j-1]);
        if (withinBounds(i, j+1)) minDist = Math.min(minDist, dists[i][j+1]);
        // if (withinBounds(i-1, j-1)) minDist = Math.min(minDist, dists[i-1][j-1]);
        // if (withinBounds(i-1, j+1)) minDist = Math.min(minDist, dists[i-1][j+1]);
        // if (withinBounds(i+1, j-1)) minDist = Math.min(minDist, dists[i+1][j-1]);
        // if (withinBounds(i+1, j+1)) minDist = Math.min(minDist, dists[i+1][j+1]);

        if (withinBounds(i-1, j) && dists[i-1][j]==minDist) {fillCol(i-1, j); i--}
        else if (withinBounds(i+1, j) && dists[i+1][j]==minDist) {fillCol(i+1, j); i++}
        else if (withinBounds(i, j-1) && dists[i][j-1]==minDist) {fillCol(i, j-1); j--}
        else if (withinBounds(i, j+1) && dists[i][j+1]==minDist) {fillCol(i, j+1); j++}
        // else if (withinBounds(i-1, j-1) && dists[i-1][j-1]==minDist) {fillCol(i-1, j-1); i--; j--;} 
        // else if (withinBounds(i-1, j+1) && dists[i-1][j+1]==minDist) {fillCol(i-1, j+1); i--; j++;}
        // else if (withinBounds(i+1, j-1) && dists[i+1][j-1]==minDist) {fillCol(i+1, j-1); i++; j--;}
        // else if (withinBounds(i+1, j+1) && dists[i+1][j+1]==minDist) {fillCol(i+1, j+1); i++; j++;}
        else alert("Error Please Restart Page");
    }
    filling=false;
}

async function shortestPaths(ii, jj, targeti, targetj) {
    function pushPix(i, j) {
        psuedoQorS.push([i, j]);
        ctx.fillRect(allPixel[i][j].x, allPixel[i][j].y, blockWid, blockWid);
        allPixel[i][j].type = 3;
    }

    let timer = 0;
    psuedoQorS = [];
    psuedoQorS.push([ii, jj]);

    dists = [];
    for (let i=0; i<dim; i++) {
        let temp = [];
        for (let j=0; j<dim; j++) {
            temp.push(-1);
        }
        dists.push(temp);
    }
    dists[ii][jj]=0;

    while (psuedoQorS.length > 0) {
        let i, j;
        i = psuedoQorS[0][0]; j = psuedoQorS[0][1];
        psuedoQorS = psuedoQorS.slice(1);

        allPixel[i][j].type = 3;
        allPixel[i][j].color = [100, 255, 100];
        allPixel[i][j].pressed = true;
        ctx.fillStyle = 'rgb(100, 255, 100)';
        ctx.fillRect(allPixel[i][j].x, allPixel[i][j].y, blockWid, blockWid);

        ctx.fillStyle = 'rgb(0, 100, 0)';
        if (works(i-1, j)) {
            pushPix(i-1, j);
            dists[i-1][j] = dists[i][j]+1;
        }   
        if (works(i+1, j)) {
            pushPix(i+1, j);
            dists[i+1][j] = dists[i][j]+1;
        }
        if (works(i, j-1)) {
            pushPix(i, j-1);
            dists[i][j-1] = dists[i][j]+1;
        }
        if (works(i, j+1)) {
            pushPix(i, j+1);
            dists[i][j+1] = dists[i][j]+1;
        }
        if (i==targeti && j==targetj) { 
            goPath(targeti, targetj);
            return;
        }
        if (timer%step==0) await sleep(pause);
        timer++;
    }
    setTimeout(function() {alert("NOT POSSIBLE");}, 100);
    filling = false;
    if (!filling)
        changingPix = setInterval(dynamic, 1);
}

function fillTime() {
    let startX=0;
    let startY=0;
    let endX = dim-2;
    let endY = dim-2;
    for (let i=0; i<dim; i++) {
        for (let j=0; j<dim; j++) {
            let tmpPix = allPixel[i][j];
            if (tmpPix.type==2) {
                startX = i;
                startY = j;
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.fillRect(tmpPix.x, tmpPix.y, blockWid, blockWid);
            }
            if (tmpPix.type==4) {
                endX = i;
                endY = j;
            }
        }
    }
    if (wantWhat=="dfs" || wantWhat=="bfs")
        floodFill(startX, startY);
    if (wantWhat=="shortestpaths")
        shortestPaths(startX, startY, endX, endY);
}

function dynamic() {
    $('#barriers').click(function() {
        drawingMode="barrier";
    });
    $('#startingPoint').click(function() {
        drawingMode="startpoint";
    });
    $('#endingPoint').click(function() {
        drawingMode="endpoint";
    });
    $('#erasebut').click(function() {
        drawingMode="erase";
    });
    $('#beginDfs').click(function() {
        if (!filling) {
            filling=true;
            wantWhat = "dfs";
        }
    });
    $('#beginBfs').click(function() {
        if (!filling) {
            filling=true;
            wantWhat = "bfs";
        }
    });
    $('#beginShortestPaths').click(function() {
        if (!filling) {
            filling=true;
            wantWhat = "shortestpaths";
        }
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
        clearInterval(changingPix);
        fillTime();
    }
}
function initialize() {
    clearInterval(changingPix);
    if (!filling) {
        cvs = document.getElementById("canv");
        ctx = cvs.getContext("2d");
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, 0, 500, 500);
        allPixel = [];
        psuedoQorS = [];
        dists = [];
        filling = false;
        drawingMode = "barrier";
        for (let i=0; i<dim; i++) {
            let temp = [];
            for (let j=0; j<dim; j++) {
                temp.push(new Pixel(i*(500/dim), j*(500/dim)));
            }   
            allPixel.push(temp);
        }
        changingPix = setInterval(dynamic, 1);
    }
    else {
        alert("Wait for fill!");
    }
}
