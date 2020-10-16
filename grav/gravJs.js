let cvs;
let ctx;
let mouseX;
let mouseY;
let clicking;
let arr = [];
let infoScreen = false; 
let gravOn = false;
let clicked = false;
let gravClicked = false;

function currPos(event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
}
function mouseDn(event) {
    clicking = true;
}
function mouseup(event) {
    clicking = false;
}
document.addEventListener('mousemove', currPos);
document.addEventListener('mousedown', mouseDn);
document.addEventListener('mouseup', mouseup);

window.onload = function() {
    cvs = document.getElementById("canv");
    cvs.width = window.innerWidth-20;
    cvs.height = window.innerHeight-30;
    ctx = cvs.getContext("2d");
    // alert("Click around the screen!");
    start();
}

function Particle(x, y, dy, dx, rad, col) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.rad = rad;
    this.col = col;
    this.update = function() {
        if (this.y+this.rad>=cvs.height && this.dy>=0) this.dy*=-0.7;
        else if (this.y-this.rad<=0 && this.dy<=0) this.dy*=-0.7;
        else if (gravOn && this.y+this.rad<cvs.height) this.dy+=0.01;

        if (this.x+this.rad>=cvs.width && this.dx>=0) this.dx*=-0.7;
        else if (this.x-this.rad<=0 && this.dx<=0) this.dx*=-0.7;

        let mult = Math.pow(Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2)),2)*Math.pow(this.rad,2)*1e-4;

        if (this.dy>0) this.dy-=0.002*mult;
        else this.dy+=0.002*mult;

        if (this.dx>0) this.dx-=0.004*mult;
        else this.dx+=0.004*mult;
        
        if (clicking) {
            let grav = getAccels(1, 2200, Math.pow(this.rad,2), mouseX, mouseY, this.x, this.y);
            this.dx += grav[0];
            this.dy += grav[1];
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI*2, false);
        ctx.fillStyle = this.col;
        ctx.fill();
        ctx.closePath();
    };
}
function rand(low, high) {
    return Math.random()*high+low;
}

function getAccels(k, m1, m2, x1, y1, x2, y2) {
    // Returns the x and y component for the object 
    // Assume m2 is the mass of the ball, m1, is the cursor

    let dist = Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
    if (dist<400) dist=400;
    let force = (k*m1*m2)/Math.pow(dist,2);

    let dx = x2-x1;
    let dy = y2-y1;
    dy*=-1;
    let theta = Math.atan(dy/dx);
    if (x1>=x2) theta += Math.PI; // compensate for limited range of atan()

    let forceX = force*Math.cos(theta);
    let forceY = force*Math.sin(theta);
    
    return [-forceX/m2, forceY/m2];
}
function playing() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.font = '40px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText("ⓘ", 5, 40);
    for (let i=0; i<150; i++) arr[i].update();

    if (mouseX>0 && mouseX<45 && mouseY>0 && mouseY<45 && clicking) {
        infoScreen = true;
        if (clicked) {
            infoScreen = false;
        }
    }
    if (mouseX>160 && mouseX<185 && mouseY>75 && mouseY<100 && clicking) {
        if (clicked) {
            gravOn = true;
            if (gravClicked) {
                gravOn = false;
            }
        }
    }
    if (!clicking) {
        if (infoScreen) clicked = true;
        else clicked = false;
        if (gravOn) gravClicked = true;
        else gravClicked = false;
    }

    if (infoScreen) {
        ctx.fillStyle = "rgb(100,100,100)";
        ctx.fillRect(30, 30, 300, 150);
        ctx.fillStyle = 'white';
        ctx.font ='20px Arial';
        ctx.fillText("Click around the screen", 50, 60);
        ctx.font ='15px Arial';
        ctx.fillText("Toggle Gravity", 50, 90);
        ctx.beginPath();
        ctx.rect(160, 75, 25, 25);
        ctx.stroke();
        if (gravOn) {
            ctx.fillStyle = 'red';
            ctx.fillRect(161,76,23,23);
        }
    }
}
function start() {
    for (let i=0; i<150; i++) {
        let col = `rgb(${rand(160,255)}, ${rand(160,255)}, ${rand(160,255)})`;
        arr.push(new Particle(rand(30,window.innerWidth-50), rand(30,window.innerHeight-50), rand(-1, 2), rand(-1, 2), rand(3, 15), col));
    }
    let bb = setInterval(playing, 1)
}