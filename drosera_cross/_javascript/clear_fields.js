$(document).ready(function() {
    $("#clear_left").click(function(){
        $('#left_input').val("");
        document.getElementById("left_input").focus();
    }); 
});
$(document).ready(function() {
    $("#clear_right").click(function(){
        $('#right_input').val("");
        document.getElementById("right_input").focus();
    }); 
});