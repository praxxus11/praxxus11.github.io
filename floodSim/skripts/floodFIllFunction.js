async function floodFill(ii, jj) {
    function pushPix(i, j) {
        psuedoQorS.push([i, j]);
        allPixel[i][j].color = [0, 100, 0];
        allPixel[i][j].draw();
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
        allPixel[i][j].draw();
        switch(gridStyle) {
            case "square":
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
                break;
            case "hex":
                if (i%2==1) {
                    if (works(i-1,j)) {
                        pushPix(i-1,j);
                    }
                    if (works(i-1,j+1)) {
                        pushPix(i-1,j+1);
                    }
                    if (works(i+1,j+1)) {
                        pushPix(i+1, j+1);
                    }
                    if (works(i+1,j)) {
                        pushPix(i+1,j);
                    }
                }
                else {
                    if (works(i-1,j-1)) {
                        pushPix(i-1,j-1);
                    }
                    if (works(i-1,j)) {
                        pushPix(i-1,j);
                    }
                    if (works(i+1,j)) {
                        pushPix(i+1, j);
                    }
                    if (works(i+1,j-1)) {
                        pushPix(i+1,j-1);
                    }
                }
                if (works(i-2,j)) {
                    pushPix(i-2,j);
                }
                if (works(i+2,j)) {
                    pushPix(i+2,j);
                }
                break;

        }
        if (timer%step==0) await sleep(pause);
        timer++;
    }
    filling = false;
    if (!filling)
        changingPix = setInterval(dynamic, 1);
}