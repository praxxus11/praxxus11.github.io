$(document).ready(function(){
    $("#left_input").on('propertychange input', function(){
        let text = $("#left_input").val();
        $('#left_show').text(text);
    });
});

$(document).ready(function(){
    $("#right_input").on('propertychange input', function(){
        let text = $("#right_input").val();
        $('#right_show').text(text);
    });
});