let cvs;
let ctx;
let mouseX;
let mouseY;
let clicking;
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
    alert("Click around the screen!");
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
        if (this.y+this.rad>=cvs.height && this.dy>=-1) this.dy*=-0.7;
        else if (this.y-this.rad<=0 && this.dy<=1) this.dy*=-0.7;
        else this.dy += 0;

        if (this.x+this.rad>=cvs.width && this.dx>=-1) this.dx*=-0.7;
        else if (this.x-this.rad<=0 && this.dx<=1) this.dx*=-0.7;

        if (this.dy>0) this.dy-=0.001;
        else this.dy+=0.001;

        if (this.dx>0) this.dx-=0.002;
        else this.dx+=0.002;

        if (clicking) {
            let grav = getAccels(1, 1500, Math.pow(this.rad,2), mouseX, mouseY, this.x, this.y);
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

function start() {
    let arr = [];
    for (let i=0; i<150; i++) {
        let col = `rgb(${rand(160,255)}, ${rand(160,255)}, ${rand(160,255)})`;
        arr.push(new Particle(50, 50, rand(0, 7), rand(0, 7), rand(3, 20), col));
    }
    let bb = setInterval(function() {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        for (let i=0; i<150; i++) arr[i].update(); 
    }, 1)
}