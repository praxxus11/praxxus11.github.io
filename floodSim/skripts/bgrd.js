$(document).ready(function(){
    $('#size_select').on('change', function (e) {
        if (!filling) {
            let usrSize = $("#size_select").val();
            if (usrSize=='10x10') {dim=10; blockWid=49;}
            if (usrSize=='50x50 (Recommended)') {dim=50; blockWid=9;}
            if (usrSize=='100x100') {dim=100; blockWid=4;}
            if (usrSize=='250x250 (Not Recommended)') {dim=250; blockWid=2;}
            initialize();
        }
        else {
            alert("Wait for fill");
        }
    });
});

function currPos(event) {
    if ($('#canv').is(':hover')) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    }
}
function mouseOn(event) {
    if ($('#canv').is(':hover')) {
        clicking = true;
    }
}
function mouseOff(event) {
    if ($('#canv').is(':hover')) {
        clicking = false;
    }
}
document.addEventListener('mousemove', currPos);
document.addEventListener('mousedown', mouseOn);
document.addEventListener('mouseup', mouseOff);