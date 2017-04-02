function chat_send(msg){
    console.log("about to ajax");
    $.post('index.php', {'function' : 'post', 'message': msg}).done(function(msg){
        console.log("success");
    });
}
/*
function update(){
    if(post){
        $.get('index.php', {'request' : 'new', 'id' : '0'}).done(function(){
            $('<li>').text(post).prependTo('.posts');

        });
    }
}
*/
var main=function(){
    //var repeat = setInterval(update, 1000);
    //var socket = io();
    $('.btn').click(function(){

        var post=$('.status-box').val();
        chat_send(post);
        //$('<li>').text(post).prependTo('.posts');
        //socket.emit('chat message', post);
        $('.status-box').val('');
        $('.counter').text(140);
        $(".btn").addClass("disabled");
        });
    /*socket.on('chat message', function(msg){
        $('<li>').text(post).prependTo('.posts');
    });*/
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
