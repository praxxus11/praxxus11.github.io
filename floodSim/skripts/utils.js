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

function Pixel(pixX, pixY)
{
    this.x = parseInt(pixX);
    this.y = parseInt(pixY);
    this.color = [255, 255, 255];
    this.pressed = false;
    // 4: end square for shortest paths, 3: a barrier or visited square, 
    // 2: start square, 1: blank sqaure
    this.type = 1;
    this.update = function()
    {
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
    if (allPixel.length>1) {
        for (let i=0; i<dim; i++) {
            for (let j=0; j<dim; j++) {
                if (Math.random()<0.1) {
                    allPixel[i][j].type = 3;
                    allPixel[i][j].pressed = true;
                    allPixel[i][j].color = [255, 100, 100];
                }
            }
        }
    }
}