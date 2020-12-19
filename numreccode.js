const cvs = document.getElementById('5263');
const ctx = cvs.getContext('2d');
const paramlink = 'https://gist.githubusercontent.com/praxxus11/7c19a855ed3cd6521d8117d497e2abbd/raw/456b6a3caf726fa5658a46dc848651d60f8e6f84/parameters.txt';
const normlink = 'https://gist.githubusercontent.com/praxxus11/efc4fcd9a2bef87bdd317db3713e92df/raw/c13279d9d783ba5039c6141712694b8bc07524c9/norm.txt';

let mulData;
let normData;
let mode = true;
let clicking = false;
let mouseX;
let mouseY;

function mouseDn(event) {
    clicking = true;
}
function mouseup(event) {
    clicking = false;
}
function currPos(event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
}
document.addEventListener('mousemove', currPos);
document.addEventListener('mousedown', mouseDn);
document.addEventListener('mouseup', mouseup);

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function Pixel(pixX, pixY) {
    this.x = pixX;
    this.y = pixY;
    this.color = 0;
    this.update = function() {
        let dist = distance(mouseX, mouseY, this.x+10, this.y+10);
        if (mode) {
            if (dist < 50) {
                if (dist < 15) {
                    this.color = 255;
                }
                else {
                    let col = (50 - dist) / 50 * 255;
                    if (col > this.color) {
                        this.color = col;
                    }
                }
            }
        }
        else {
            if (dist < 150) {
                this.color = 0;
            }
        }
    };
}
let pixels = [];
for (let i = 0; i < 28; i++) {
    let pix = []
    for (let j = 0; j < 28; j++) {
        pix.push(new Pixel(20*i, 20*j));
    }
    pixels.push(pix);
}

//calculates the values AND prints it too
function frontProp(arr) {
    let params = mulData.split(',').map(x => Number(x));
    let us = nj.concatenate(1, nj.array(arr));
    params = nj.array(params);
    theta1 = params.slice([0, 19625]).reshape(25, 785);
    theta2 = params.slice([19625, 20275]).reshape(25, 26);
    theta3 = params.slice([20275, 20535]).reshape(10, 26);
    let a2 = nj.concatenate(1, nj.sigmoid(nj.dot(theta1, us)));
    let a3 = nj.concatenate(1, nj.sigmoid(nj.dot(theta2, a2)));
    let a4 = nj.sigmoid(nj.dot(theta3, a3));
    maxi = 1;
    for (let i = 0; i < 10; i++) {
        if (a4.get(i) > a4.get(maxi)) {
            maxi = i;
        }
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(560, 120, 270, 560)
    ctx.fillRect(567, 0, 33, 120);
    ctx.fillRect(600, 0, 150, 20);
    ctx.fillRect(600, 60, 150, 20);
    ctx.font = '30px Impact';
    for (let i = 0; i<10; i++) {
        ctx.fillStyle = 'red';
        if (i==maxi) {
            ctx.fillStyle = `rgb(${128*(1-a4.get(maxi))}, ${128*a4.get(maxi)}, 0)`
        }
        let text = i.toString() + ": " + (a4.get(i)*100).toFixed(4) + "%";
        ctx.fillText(text, 600, 170+i*40);
    }
}

function calcu(arrr) {
    arr = []
    for (let pix of arrr) {
        for (let p of pix) {
            arr.push(p);
        }
    }
    norm = normData.split(',').map(x => Number(x));
    for (let i=0; i<arr.length; i++) {
        if (norm[i * 2 + 1] != 0) {
            arr[i] = (arr[i] - norm[i * 2]) / norm[i * 2 + 1]
        }
        else {
            arr[i] = 0;
        }
        if (arr[i] > 100) {
            arr[i] = 0;
        }
    }
    frontProp(arr);
}

function draw() {
    window.requestAnimationFrame(draw);
    //Drawing the canvase itself
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 560, 560);
    ctx.fillStyle = 'white';
    ctx.fillRect(560, 0, 7, 560)

    //Drawing in the buttons with text
    ctx.fillStyle = mode ? 'rgb(255, 0, 0)' : 'rgb(150, 0, 0)';
    ctx.fillRect(600, 20, 150, 40);
    ctx.fillStyle = mode ? 'rgb(150, 150, 150)' : 'rgb(240, 240, 240)';
    ctx.fillRect(600, 80, 150, 40);
    ctx.font = '30px Impact';
    ctx.fillStyle = 'black';
    ctx.fillText('Erase', 640, 50);
    ctx.fillText('Paint', 640, 110);

    //Check if the mouse hits the buttons
    if (clicking) {
        if (mouseX > 600 && mouseX < 750 && mouseY > 20 && mouseY < 60) {
            mode = false;
        }
        if (mouseX > 600 && mouseX < 750 && mouseY > 80 && mouseY < 120) {
            mode = true;
        }
    }

    //Update pixel values
    if (clicking && mouseX < 560) {
        for (let pix of pixels) {
            for (let p of pix) {
                p.update();
            }
        }
    }
    //Drawing in the pixel values
    for (let pix of pixels) {
        for (let p of pix) {
            ctx.fillStyle = `rgb(${p.color}, ${p.color}, ${p.color})`;
            ctx.fillRect(p.x, p.y, 20, 20);
        }
    }
    //Drawing the dotted lines
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 100, 1, 360);
    ctx.fillRect(100, 460, 360, 1);
    ctx.fillRect(100, 100, 360, 1);
    ctx.fillRect(460, 100, 1, 360);
    //Drawing the circle around the mouse
    if (mouseX < 560) {
        let rad = mode ? 30 : 150;
        ctx.beginPath();
        ctx.setLineDash([1, 0]);
        ctx.arc(mouseX, mouseY, rad, 0, 2 * Math.PI, false);
        ctx.lineWidth = 2;
        ctx.strokeStyle = mode ? '#FFFFFF' : '#FF0000';
        ctx.stroke();
    }

    //Checking the pixel values
    let pixVals = []
    for (let i = 0; i < 28; i++) {
        pixV = [];
        for (let j = 0; j < 28; j++) {
            pixV.push(pixels[j][i].color);
        }
        pixVals.push(pixV);
    }
    if (normData && mulData)
        calcu(pixVals);
}

window.onload = function() {
    fetch(normlink).then(response=>response.text()).then(function(data) {
        normData=data;
    })
    .then(() => fetch(paramlink).then(response=>response.text()).then(function(data) {
        mulData=data;
    }));
    window.requestAnimationFrame(draw);
}
