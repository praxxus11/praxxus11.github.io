$(document).ready(function() {
    $('#mag').on('change', function(e) {
        initMag = $('#mag').val();
    })
    $('#angl').on('change', function(e) {
        initAngle = $('#angl').val();
    })
    $('#stren').on('change', function(e) {
        grav = $('#stren').val();
    })
});
