$(document).ready(function(){
    $('#barriers').click(function() {
        drawingMode="barrier";
    });
    $('#startingPoint').click(function() {
        drawingMode="startpoint";
    });
    $('#endingPoint').click(function() {
        drawingMode="endpoint";
    });
    $('#erasebut').click(function() {
        drawingMode="erase";
    });
    $('#beginDfs').click(function() {
        if (!filling) {
            wantWhat = "dfs";
            filling = true;
        }
    });
    $('#beginBfs').click(function() {
        if (!filling) {
            wantWhat = "bfs";
            filling = true;
        }
    });
    $('#beginShortestPaths').click(function() {
        if (!filling) {
            wantWhat = "shortestpaths";
            filling = true;
        }
    });
    $('#beginAStar').click(function() {
        if (!filling) {
            wantWhat = 'astar';
            filling = true;
        }
    })
    $('#size_select').on('change', function (e) {
        if (!filling) {
            let usrSize = $("#size_select").val();
            if (usrSize=='10x10') {dim=10; blockWid=49;}
            else if (usrSize=='50x50') {dim=50; blockWid=9;}
            else if (usrSize=='100x100') {dim=100; blockWid=4;}
            else if (usrSize=='250x250') {dim=250; blockWid=2;}
            else if (usrSize=='500x500') {dim=500; blockWid=1;}
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
    $('#squareGrid').on('click', function(e) {
        if (filling) {
            alert('Wait for fill');
        }
        else {
            gridStyle='square';
            initialize();
        }
    });
    $('#hexGrid').on('click', function(e) {
        if (filling) {
            alert('Wait for fill');
        }
        else {
            gridStyle='hex';
            initialize();
        }
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