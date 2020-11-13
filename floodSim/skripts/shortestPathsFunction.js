async function goPath(targeti, targetj) {
    function withinBounds(i, j) {
        if (i<0||i>=allPixel.length||j<0||j>=allPixel[0].length) return false;
        if (dists[i][j]==-1) return false;
        return true;
    }
    function fillCol(i, j) {
        allPixel[i][j].color = [120, 90, 255];
        allPixel[i][j].draw();
    }
    let timer = 0;
    let i = targeti, j = targetj;
    fillCol(i, j);
    while (dists[i][j]!=0) {
        let minDist = 1e7;
        switch(gridStyle) {
            case "square":
                if (withinBounds(i-1, j)) minDist = Math.min(minDist, dists[i-1][j]);
                if (withinBounds(i+1, j)) minDist = Math.min(minDist, dists[i+1][j]);
                if (withinBounds(i, j-1)) minDist = Math.min(minDist, dists[i][j-1]);
                if (withinBounds(i, j+1)) minDist = Math.min(minDist, dists[i][j+1]);
        
                if (withinBounds(i-1, j) && dists[i-1][j]==minDist) {fillCol(i-1, j); i--;}
                else if (withinBounds(i+1, j) && dists[i+1][j]==minDist) {fillCol(i+1, j); i++;}
                else if (withinBounds(i, j-1) && dists[i][j-1]==minDist) {fillCol(i, j-1); j--;}
                else if (withinBounds(i, j+1) && dists[i][j+1]==minDist) {fillCol(i, j+1); j++;}
                break;
            case "hex":
                if (i%2==1) {
                    if (withinBounds(i-1,j)) minDist = Math.min(minDist, dists[i-1][j]);
                    if (withinBounds(i-1,j+1)) minDist = Math.min(minDist, dists[i-1][j+1]);
                    if (withinBounds(i+1,j+1)) minDist = Math.min(minDist, dists[i+1][j+1]);
                    if (withinBounds(i+1,j)) minDist = Math.min(minDist, dists[i+1][j]);
                }
                else {
                    if (withinBounds(i-1,j-1)) minDist = Math.min(minDist, dists[i-1][j-1]);
                    if (withinBounds(i-1,j)) minDist = Math.min(minDist, dists[i-1][j]);
                    if (withinBounds(i+1,j)) minDist = Math.min(minDist, dists[i+1][j]);
                    if (withinBounds(i+1,j-1)) minDist = Math.min(minDist, dists[i+1][j-1]);
                }
                if (withinBounds(i-2,j)) minDist = Math.min(minDist, dists[i-2][j]);
                if (withinBounds(i+2,j)) minDist = Math.min(minDist, dists[i+2][j]);

                if (i%2==1) {
                    if (withinBounds(i-1,j) && dists[i-1][j]==minDist) {fillCol(i-1, j); i--;}
                    else if (withinBounds(i-1,j+1) && dists[i-1][j+1]==minDist) {fillCol(i-1, j+1); i--; j++;}
                    else if (withinBounds(i+1,j+1) && dists[i+1][j+1]==minDist) {fillCol(i+1, j+1); i++; j++;}
                    else if (withinBounds(i+1,j) && dists[i+1][j]==minDist) {fillCol(i+1, j); i++;}
                    else if (withinBounds(i-2,j) && dists[i-2][j]==minDist) {fillCol(i-2, j); i-=2;}
                    else if (withinBounds(i+2,j) && dists[i+2][j]==minDist) {fillCol(i+2, j); i+=2;}
                }
                else {
                    if (withinBounds(i-1,j-1) && dists[i-1][j-1]==minDist) {fillCol(i-1, j-1); i--; j--;}
                    else if (withinBounds(i-1,j) && dists[i-1][j]==minDist) {fillCol(i-1, j); i--;}
                    else if (withinBounds(i+1,j) && dists[i+1][j]==minDist) {fillCol(i+1, j); i++;}
                    else if (withinBounds(i+1,j-1) && dists[i+1][j-1]==minDist) {fillCol(i+1, j-1); i++; j--;}
                    else if (withinBounds(i-2,j) && dists[i-2][j]==minDist) {fillCol(i-2, j); i-=2;}
                    else if (withinBounds(i+2,j) && dists[i+2][j]==minDist) {fillCol(i+2, j); i+=2;}
                }
        }
        if (timer%(step*5)==0) await sleep(pause);
        timer++;
    }
    filling=false;
}

async function shortestPaths(ii, jj, targeti, targetj) {
    function pushPix(i, j) {
        psuedoQorS.push([i, j]);
        allPixel[i][j].color = [0, 100, 0];
        allPixel[i][j].draw();
        allPixel[i][j].type = 3;
    }
    
    let timer = 0;
    psuedoQorS = [];
    psuedoQorS.push([ii, jj]);
    
    dists = [];
    for (let i=0; i<allPixel.length; i++) {
        let temp = [];
        for (let j=0; j<allPixel[0].length; j++) {
            temp.push(-1);
        }
        dists.push(temp);
    }
    dists[ii][jj]=0;

    while (psuedoQorS.length>0) {
        let i, j;
        i = psuedoQorS[0][0]; j = psuedoQorS[0][1];
        psuedoQorS = psuedoQorS.slice(1);

        allPixel[i][j].type = 3;
        allPixel[i][j].color = [100, 255, 100];
        allPixel[i][j].pressed = true;
        allPixel[i][j].draw();

        switch(gridStyle) {
            case "square":
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
                break;
            case "hex":
                if (i%2==1) {
                    if (works(i-1,j)) {
                        pushPix(i-1,j);
                        dists[i-1][j] = dists[i][j]+1;
                    }
                    if (works(i-1,j+1)) {
                        pushPix(i-1,j+1);
                        dists[i-1][j+1] = dists[i][j]+1;
                    }
                    if (works(i+1,j+1)) {
                        pushPix(i+1, j+1);
                        dists[i+1][j+1] = dists[i][j]+1;
                    }
                    if (works(i+1,j)) {
                        pushPix(i+1,j);
                        dists[i+1][j] = dists[i][j]+1;
                    }
                }
                else {
                    if (works(i-1,j-1)) {
                        pushPix(i-1,j-1);
                        dists[i-1][j-1] = dists[i][j]+1;
                    }
                    if (works(i-1,j)) {
                        pushPix(i-1,j);
                        dists[i-1][j] = dists[i][j]+1;
                    }
                    if (works(i+1,j)) {
                        pushPix(i+1, j);
                        dists[i+1][j] = dists[i][j]+1;
                    }
                    if (works(i+1,j-1)) {
                        pushPix(i+1,j-1);
                        dists[i+1][j-1] = dists[i][j]+1;
                    }
                }
                if (works(i-2,j)) {
                    pushPix(i-2,j);
                    dists[i-2][j] = dists[i][j]+1;
                }
                if (works(i+2,j)) {
                    pushPix(i+2,j);
                    dists[i+2][j] = dists[i][j]+1;
                }
                if (i==targeti && j==targetj) { 
                    goPath(targeti, targetj);
                    return;
                }
        }

        if (timer%step==0) await sleep(pause);
        timer++;
    }
    setTimeout(function() {alert("NOT POSSIBLE");}, 100);
    filling = false;
    if (!filling)
        changingPix = setInterval(dynamic, 1);
}