function works(i, j) {
    if (i<0 || i>=dim || j<0 || j>=dim) return false; 
    if (allPixel[i][j].type==3) return false;
    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function mouseAffectingPix(x, y) {
    let radius = document.getElementById('brush_slider').value;
    if (Math.sqrt(Math.pow(x-mouseX, 2) + Math.pow(y-mouseY, 2)) <= radius) 
        return true;
    return false;
}

function Pixel(pixX, pixY) {
    this.x = parseInt(pixX);
    this.y = parseInt(pixY);
    this.color = [255, 255, 255];
    this.pressed = false;
    // 4: end square for shortest paths, 3: a barrier or visited square, 
    // 2: start square, 1: blank sqaure
    this.type = 1;
    this.update = function() {
        if (mouseAffectingPix(this.x, this.y)) {
            if (clicking) {
                if (drawingMode=="barrier") {
                    this.color = [255, 100, 100];
                    this.pressed = true;
                    this.type = 3;
                }
                else if (drawingMode=='startpoint') {
                    this.color = [100, 255, 100];
                    this.pressed = true;
                    this.type = 2;
                }
                else if (drawingMode=='endpoint') {
                    this.color = [100, 100, 255];
                    this.pressed = true;
                    this.type = 4;
                }
                else if (drawingMode=='erase') {
                    this.color = [255, 255, 255];
                    this.pressed = false;
                    this.type = 1;
                }
            }
            else if (!this.pressed) {
                if (drawingMode=="barrier")
                    this.color = [255, 225, 225];
                else if (drawingMode=='startpoint')
                    this.color = [225, 255, 225];
                else if (drawingMode=='endpoint')
                    this.color = [225, 225, 255];
                else if (drawingMode=='erase')
                    this.color = [235, 235, 235];
            }
        }
        else if (!this.pressed) 
            this.color = [255, 255, 255];   
    };
}

function rand() {
    function works(i, j) {
        if (i<0||i>=dim||j<0||j>=dim) return false;
        if (allPixel[i][j].type==1) return false;
        return true;
    }
    if (!filling) {
        for (let i=0; i<dim; i++) {
            for (let j=0; j<dim; j++) {
                allPixel[i][j].pressed = false;
                allPixel[i][j].type = 10;
                if (!(i%2==0 && j%2==0)) {
                    allPixel[i][j].color = [255, 100, 100];
                    allPixel[i][j].pressed = true;
                    allPixel[i][j].type = 3;
                }
            }
        }
        let i=0, j=0;
        let s = [];
        s.push([i, j]);
        allPixel[i][j].type = 1;
        while (s.length!=0) {
            let temp = s.pop();
            i=temp[0]; j=temp[1];
            let validness = [works(i, j-2), works(i, j+2), works(i-2, j), works(i+2, j)];
            let possib = [[i, j-2], [i, j+2], [i-2, j], [i+2, j]];
            let avail = [];
            for (let i=0; i<4; i++) {
                if (validness[i])
                    avail.push(possib[i]);
            }
            if (avail.length>0) {
                s.push([i, j]);
                let rand = Math.floor(Math.random()*avail.length);
                let toPush = avail[rand];
                let iT = toPush[0];
                let jT = toPush[1];
                if (j-jT==2) {
                    allPixel[i][j-1].pressed = false;
                    allPixel[i][j-1].type = 1;
                    
                    allPixel[i][j-2].type = 1;
                    s.push([i, j-2]);
                }
                if (j-jT==-2) {
                    allPixel[i][j+1].pressed = false;
                    allPixel[i][j+1].type = 1;
                    
                    allPixel[i][j+2].type = 1;
                    s.push([i, j+2]);
                }
                if (i-iT==2) {
                    allPixel[i-1][j].pressed = false;
                    allPixel[i-1][j].type = 1;
                    
                    allPixel[i-2][j].type = 1;
                    s.push([i-2, j]);
                }
                if (i-iT==-2) {
                    allPixel[i+1][j].pressed = false;
                    allPixel[i+1][j].type = 1;
                    
                    allPixel[i+2][j].type = 1;
                    s.push([i+2, j]);
                }
            }
        }
    }
    else {
        alert("Wait for fill");
    }
}

function static() {
    if (!filling) {
        for (let j=0; j<dim; j++) {
            for (let i=0; i<dim; i++) {
                if (Math.random()<0.3) {
                    allPixel[i][j].color = [255, 100, 100];
                    allPixel[i][j].pressed = true;
                    allPixel[i][j].type = 3;
                }
                else {
                    allPixel[i][j].color = [255, 255, 255];
                    allPixel[i][j].pressed= false;
                    allPixel[i][j].type = 1;
                }
            }
        }
    }
    else {
        alert("Wait for fill");
    }
}