$(document).ready(function(){
    $('#size_select').on('change', function (e) {
        if (!filling) {
            let usrSize = $("#size_select").val();
            if (usrSize=='10x10') {dim=10; blockWid=49;}
            else if (usrSize=='50x50 (Recommended)') {dim=50; blockWid=9;}
            else if (usrSize=='100x100') {dim=100; blockWid=4;}
            else if (usrSize=='250x250 (Not Recommended)') {dim=250; blockWid=2;}
            else if (usrSize=='500x500 (!!!WARNING!!!)') {dim=500; blockWid=1;}
            initialize();
        }
        else {
            alert("Wait for fill");
        }
    });
    $('#fillspd').on('change', function(e) {
        let spd = $('#fillspd').val();
        if (spd=='Super Slow') {pause = 100; step = 1;}
        else if (spd=='Medium') {pause = 1; step = 1;}
        else if (spd=='Fast') {pause = 1; step = 5;}
        else if (spd=='Almost Instant') {pause = 1; step = 30;}
        else if (spd=='Actually Instant') {pause=1; step=1e7;}
    });
});

$(document).ready(function() {
    $('#draw_board_toggle').click(function() {
        $('#action_buttons').hide();
        $('#setting_buttons').hide();
        $('#drawing_buttons').show();
    });
    $('#action_button_toggle').click(function() {
        $('#drawing_buttons').hide();
        $('#setting_buttons').hide();
        $('#action_buttons').show();
    });
    $('#setting_button_toggle').click(function() {
        $('#drawing_buttons').hide();
        $('#action_buttons').hide();
        $('#setting_buttons').show();
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