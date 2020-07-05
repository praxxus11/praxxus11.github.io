const cvs = document.getElementById('5263');
const ctx = cvs.getContext('2d');

let mode = true;
let clicking = false;
let mouseX;
let mouseY;

function mouseDn(event)
{
    clicking = true;
}
function mouseup(event)
{
    clicking = false;
}
function currPos(event)
{
    mouseX = event.offsetX;
    mouseY = event.offsetY;
}
document.addEventListener('mousemove', currPos);
document.addEventListener('mousedown', mouseDn);
document.addEventListener('mouseup', mouseup);

function distance(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}
function Pixel(pixX, pixY)
{
    this.x = pixX;
    this.y = pixY;
    this.color = 0;
    this.update = function()
    {
        let dist = distance(mouseX, mouseY, this.x+10, this.y+10);
        if (mode)
        {
            if (dist < 50)
            {
                if (dist < 15)
                {
                    this.color = 255;
                }
                else 
                {
                    let col = (50 - dist) / 50 * 255;
                    if (col > this.color) 
                    {
                        this.color = col;
                    }
                }
            }
        }
        else
        {
            if (dist < 150)
            {
                this.color = 0;
            }
        }
    };
}
let pixels = [];
for (let i = 0; i < 28; i++)
{
    for (let j = 0; j < 28; j++)
    {
        pixels.push(new Pixel(20*i, 20*j));
    }
}

//calculates the values AND prints it too


function draw()
{
    //Drawing the canvase itself
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 800, 560);
    ctx.fillStyle = 'white';
    ctx.fillRect(560, 0, 7, 560)

    //Drawing in the buttons with text
    ctx.fillStyle = mode ? 'rgb(255, 0, 0)' : 'rgb(150, 0, 0)';
    ctx.fillRect(600, 20, 150, 40);
    ctx.fillStyle = mode ? 'rgb(150, 150, 150)' : 'rgb(255, 255, 255)';
    ctx.fillRect(600, 80, 150, 40);
    ctx.font = '30px Impact';
    ctx.fillStyle = 'black';
    ctx.fillText('Erase', 640, 50);
    ctx.fillText('Paint', 640, 110);
    //Check if the mouse hits the buttons
    if (clicking)
    {
        if (mouseX > 600 && mouseX < 750 && mouseY > 20 && mouseY < 60)
        {
            mode = false;
        }
        if (mouseX > 600 && mouseX < 750 && mouseY > 80 && mouseY < 120)
        {
            mode = true;
        }
    }

    //Update pixel values
    if (clicking && mouseX < 560)
    {
        for (let i = 0; i < pixels.length; i++)
        {
            pixels[i].update();
        }
    }
    //Drawing in the pixel values
    for (let p of pixels)
    {
        ctx.fillStyle = `rgb(${p.color}, ${p.color}, ${p.color})`;
        ctx.fillRect(p.x, p.y, 20, 20);
    }

    //Drawing the circle around the mouse
    if (mouseX < 560)
    {
        let rad = mode ? 30 : 150;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, rad, 0, 2 * Math.PI, false);
        ctx.lineWidth = 2;
        ctx.strokeStyle = mode ? '#FFFFFF' : '#FF0000';
        ctx.stroke();
    }

    //Checking the pixel values
    let pixVals = []
    for (let p of pixels)
    {
        pixVals.push(p.color)
    }
}

let start = setInterval(draw, 10);
