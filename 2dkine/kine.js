let cvs;
let ctx;
let initAngle = 70;
let initMag = 250;
let grav = 100;
let vx;
let vy;
let xx;
let yy;
let start;

function drawCircle(radius, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
}
let bef = performance.now();
function draw() {
    let curr = performance.now()
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 750, 750);
    drawCircle(10, xx, yy);

    xx -= (vx * (bef-curr))/1000.0;
    yy += (vy * (bef-curr))/1000.0;
    vy -= (-grav * (bef-curr))/1000.0;

    if (xx>605 || xx<5) vx = -(4/5)*vx;
    if (yy>605 || yy<5) vy = -(4/5)*vy;

    bef = curr;
}
function go() {
    clearInterval(start);   
    cvs = document.getElementById("canv");
    ctx = cvs.getContext("2d");
    xx = 100;   
    yy = 500;
    vx = initMag * Math.cos((Math.PI/180.0) * initAngle);
    vy = initMag * Math.sin((Math.PI/180.0) * initAngle);
    start = setInterval(draw, 1)
}