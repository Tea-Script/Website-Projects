var post;
function chat_send(msg){
    console.log("about to ajax");
    $.post('index.php', {'function' : 'send', 'message': msg}).done(function(message){
        console.log("success");
    });
}
function update(){
    if(post){
        $.get('index.php', {'request' : 'new', 'id' : '0'}).done(function(){
            $('<li>').text(post).prependTo('.posts');

        });
    }
}

var main=function(){
    //var repeat = setInterval(update, 1000);
    $('.btn').click(function(){
        
        var post=$('.status-box').val();
        $('<li>').text(post).prependTo('.posts');
        //chat_send(pst);
        $('.status-box').val('');
        $('.counter').text(140);
        $(".btn").addClass("disabled");
        });
        
    $('.status-box').keyup(function(){
        var postLength= $(this).val().length;
        var charactersLeft = 140 - postLength;
        $('.counter').text(charactersLeft);
        if(charactersLeft < 0){
            $('.btn').addClass('disabled');
        }
        else if(charactersLeft===140){
            $('.btn').addClass('disabled');
        }
        else{
            $('.btn').removeClass('disabled');
        }
    });
    $('.btn').addClass('disabled')
};
$(document).ready(main)                 
