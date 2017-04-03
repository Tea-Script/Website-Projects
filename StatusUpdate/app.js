var msg_total = 0;
function chat_send(msg){ //posts message requests to server
    console.log("sending message to server");
    $.post('./chat.php',{send: msg}, function(reset){
        if(reset){
          msg_total = 0;
        }

    });
}

function update(){ //requests new messages from server (automatically every 10s)
    $.get('./chat.php', {req: "all"}, function(msgs){


      if(msgs){
        msgs = msgs.split(',');

        for(var i = msg_total; i < msgs.length - 1; i++){
          var msg = msgs[i];
          $('<li>').text(msg).prependTo('.posts');
          msg_total++;
        }
      }
    });

}

var main=function(){
    var repeat = setInterval(update, 500);
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
