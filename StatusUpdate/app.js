function chat_send(msg){
    console.log("sending message to server");
    $.post('./chat.php',{send: post}, function(response){
        console.log(response);
    });
}

function update(){
    $.get('./chat.php', function(msgs){
      if(msgs){
        for(msg : msgs){
          $('<li>').text(msg).prependTo('.posts');
        }
      }
    });

}

var main=function(){
    var repeat = setInterval(update, 10000);
    //var socket = io();
    $('.btn').click(function(){

        var post=$('.status-box').val();
        chat_send(post);
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
