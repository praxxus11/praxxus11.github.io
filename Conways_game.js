const cvs = document.getElementById('can');
const ctx = cvs.getContext('2d');

//Stores the positions of the mouse position
let mouseX;
let mouseY;

//Stores the information about the individual pixels
let pixWidth;
let blockWide;
let blockTall;

//Reads in the mouses current position into the variables
function currPos(event)
{
    mouseX = event.offsetX;
    mouseY = event.offsetY;
}
function mouseOn(event)
{
    clicking = true;
}
function mouseOff(event)
{
    clicking = false;
}

document.addEventListener('mousemove', currPos);
document.addEventListener('mousedown', mouseOn);
document.addEventListener('mouseup', mouseOff);

//Defines the class for a individual dynamic pixel (responds to mouse)
function Pixel(pixX, pixY)
{
    this.x = parseInt(pixX);
    this.y = parseInt(pixY);
    this.color = 0;
    this.pressed = false;
    this.update = function()
    {
        if (mouseX<this.x+parseInt(pixWidth) && mouseX>this.x && mouseY>this.y && mouseY<this.y+parseInt(pixWidth)) {
            if (clicking) {
                this.color = 255;
                this.pressed = true;
            }
            else if (!this.pressed) {
                this.color = 100;
            }
        }
        else if (!this.pressed) {
            this.color = 0;
        }
    };
}

//Start is the interval that controls the changing of the field
//pixelMat holds the array of dynamic pixels and contents can be changed in the loading functions
let start;
let pixelMat;

//Called when 'start' button is pressed
//Initializes pixels and stores into pix array
//Loads in the avaiable load in designs
function startup(pixelSize, blockW, blockT)
{
    blockWide = blockW;
    blockTall = blockT;
    pixWidth = pixelSize;
    pixelMat = []
    for (let i=0; i<blockWide; i++) {
        let temp = [];
        for (let j=0; j<blockTall; j++) {
            temp.push(new Pixel(i*pixWidth, j*pixWidth));
        }
        pixelMat.push(temp);
    }
    cvs.height += cvs.height * 0.15;
    document.getElementById('loadin').style.visibility = 'visible';
    start = setInterval(mainloop, 1);
}

//Updates each pixel value according to mouse hover and press-down
//Also creates the green start area below and detects mouse
function mainloop()
{
    for (let row of pixelMat) {
        for (let p of row) {
        p.update();
        ctx.fillStyle = `rgb(${p.color}, ${p.color}, ${p.color})`;
        ctx.fillRect(p.x, p.y, pixWidth, pixWidth);
        }
    }
    mouseOnButton = (mouseX>0 && mouseX<cvs.width && mouseY>cvs.height/1.15 && 
                    mouseY<cvs.height/1.15 + cvs.height/1.15*0.15)
    ctx.fillStyle = (mouseOnButton && clicking) ? 'rgb(0, 100, 0)' : 
                    (mouseOnButton) ? 'rgb(0, 200, 0)' : 
                    'rgb(0, 255, 0)';
    ctx.fillRect(0, cvs.height/1.15, cvs.width, (cvs.height/1.15)*0.15);
    if (mouseOnButton && clicking)
    {
        let onoffMatrix = [];
        for (let j=0; j<blockTall; j++) {
            let temp = []
            for (let i=0; i<blockWide; i++) {
                temp.push(pixelMat[i][j].color == 255);
            }
            onoffMatrix.push(temp);
        }
        clearInterval(start);
        beginAnimation(onoffMatrix);
    }
}

//Defines the properties of the static pixel
function sPixel(pixX, pixY, color)
{
    this.x = pixX;
    this.y = pixY;
    this.color = color;
}

//status: holds a matrix of booleans telling if pixel at i, j is lit up
//sPix: holds an array of static pixels 
//fps: refresh rate of the game
let status;
let sPix;
let fps = 10;

//Makes the slider visible and turns of the availability load in options
//Initializes an array of static pixels in accordance to the boolean mat passed in 
function beginAnimation(mat)
{
    document.getElementById('setfps').style.visibility = 'visible';
    document.getElementById('loadin').style.visibility = 'hidden';
    cvs.height /= 1.15;
    status = mat;
    sPix = [];
    for (let i=0; i<mat.length; i++) {
        let temp = [];
        for (let j=0; j<mat[0].length; j++) {
            temp.push(new sPixel(j*pixWidth, i*pixWidth, mat[i][j] ? 255 : 0));
        }
        sPix.push(temp);
    }
    animate();
}

//counter for the iterations
let iteration = 0;

//takes in the status changed from update() and updates the corresponding
//static pixels in sPix
//Also controls the sliding bar and iteration count
function animate() {
    for (let i=0; i<status.length; i++) {
        for (let j=0; j<status[0].length; j++) {
            sPix[i][j].color = status[i][j] ? 255 : 0;
        }
    }
    for (let row of sPix) {
        for (let p of row) {
            ctx.fillStyle = `rgb(${p.color}, ${p.color}, ${p.color})`;
            ctx.fillRect(p.x, p.y, pixWidth, pixWidth);
        }
    }
    update();
    iteration++;
    document.getElementById('iternum').innerHTML = "Iteration: " + iteration;
    window.setTimeout(animate, fps);
    fps = (200 - document.getElementById('fps').value);
    document.getElementById('refreshrate').innerHTML = "Refresh Rate: " + fps;
}

//Updates the array boolean in accordance to the rule of game of life
function update() {
    let temp = JSON.parse(JSON.stringify(status));
    for (let i=0; i<status.length; i++) {
        for (let j=0; j<status[0].length; j++) {
            let neighborCount = 0;
            //topleft
            neighborCount += (!withinBound(i-1, j-1)) ? 0 : status[i-1][j-1] ? 1 : 0;
            //topmid
            neighborCount += (!withinBound(i-1, j)) ? 0 : status[i-1][j] ? 1 : 0;
            //topright
            neighborCount += (!withinBound(i-1, j+1)) ? 0 : status[i-1][j+1] ? 1 : 0;
            //midleft
            neighborCount += (!withinBound(i, j-1)) ? 0 : status[i][j-1] ? 1 : 0;
            //midright
            neighborCount += (!withinBound(i, j+1)) ? 0 : status[i][j+1] ? 1 : 0;
            //botleft
            neighborCount += (!withinBound(i+1, j-1)) ? 0 : status[i+1][j-1] ? 1 : 0;
            //botmid
            neighborCount += (!withinBound(i+1, j)) ? 0 : status[i+1][j] ? 1 : 0;
            //botright
            neighborCount += (!withinBound(i+1, j+1)) ? 0 : status[i+1][j+1] ? 1 : 0;

            if (status[i][j]) { 
                temp[i][j] = neighborCount < 2 || neighborCount > 3 ? false : true;
            }
            else if (neighborCount == 3) {
                temp[i][j] = true;
            }
        }
    }
    status = JSON.parse(JSON.stringify(temp));
}

//Checks if single example is in the game
function withinBound(i, j) {
    return (i >= 0 && j >= 0 && i < blockTall && j < blockWide);
}

function makeObj(str, offset=0)
//Given a string block, changes the dynamic pixelMat pixels, offset optional 
{
    clr();
    let rows = str.split('\n');
    if (blockWide < rows[0].length + 2*offset || blockTall < rows.length + 2*offset) {
        alert(`Your game board is too small! (Need a ${rows.length+2*offset}x${rows[0].length+2*offset} grid)`);
    }
    else {
        let rows = str.split('\n');
        rows = rows.map(row => row.trim());
        for (let i=0; i<rows.length; i++) {
            for (let j=0; j<rows[0].length; j++) {
                if (rows[i].charAt(j) == 'O') {
                    pixelMat[j+offset][i+offset].color = 255;
                    pixelMat[j+offset][i+offset].pressed = true;
                }
                else {
                    pixelMat[j+offset][i+offset].color = 0;
                    pixelMat[j+offset][i+offset].pressed = false;
                }
            }
        }
    }
}

function makeRandom() 
//Randomizes game board
{
    for (let i=0; i<pixelMat.length; i++) {
        for (let j=0; j<pixelMat[0].length; j++) {
            let rand = Math.floor(Math.random()*2);
            if (rand == 1) {
                pixelMat[i][j].color = 255;
                pixelMat[i][j].pressed = true;
            }
            if (rand == 0) {
                pixelMat[i][j].color = 0;
                pixelMat[i][j].pressed = false;
            }
        }
    }
}
function clr() 
//Clears Game board
{
    for (let i=0; i<pixelMat.length; i++) {
        for (let j=0; j<pixelMat[0].length; j++) {
            pixelMat[i][j].color = 0;
            pixelMat[i][j].pressed = false;
        }
    }
}
function gosper() {
    let binGun = `........................O...........
    ......................O.O...........
    ............OO......OO............OO
    ...........O...O....OO............OO
    OO........O.....O...OO..............
    OO........O...O.OO....O.O...........
    ..........O.....O.......O...........
    ...........O...O....................
    ............OO......................`; 
    makeObj(binGun);
}
function glider() {
    let gun = `.O.
                ..O
                OOO`;
    makeObj(gun);
}
function doubleEngine() {
    let space = `.OO....................................
	.OO.................O..................
	...................O.O............O.O..
	....................O............O.....
	OO.......OO.......................O..O.
	OO.O.....OO.......................O.O.O
	...O.......................O.......O..O
	...O.......................OO.......OO.
	O..O.................OO.....O..........
	.OO..................O.................
	.....................OOO...............
	....................................OO.
	....................................OO.
	.OO....................................
	O..O...................................
	O.O.O................O.O....OO.....OO..
	.O..O.................OO....OO.....OO.O
	.....O............O...O...............O
	..O.O............O.O..................O
	..................O................O..O
	....................................OO.`
    makeObj(space, 20);
}
function P246() {
    let gun = `..................................O........
	..................................OOO......
	................................OO...O.....
	...............................O.O.OO.O....
	..............................O..O..O.O....
	....................................O.OO...
	..................................O.O......
	................................O.O.O......
	.................................OO.OO.....
	...........................................
	OO.........................................
	.O.........................................
	.O.O.................OO....................
	..OO..................O..................OO
	....................O.O..................O.
	....................OO.................O.O.
	.......................................OO..
	...........................................
	...........................................
	...........................................
	...........................................
	...........................................
	...........................................
	.............................OO............
	.......................O.....OO............
	.................OO.OOO....................
	.................O..OOOO...................
	.................O.OO......................
	...........................................
	...........................................
	.....O.....................................
	....O.OOOO.................................
	...O.O.OOO.................................
	..O.O......................................
	...O.......................................
	...OO......................................
	...OO......................................
	...OO......................................`
    makeObj(gun, 10);
}