function chat_send(msg){ //posts message requests to server
    console.log("sending message to server");
    $.post('./chat.php',{send: msg}, function(response){
        console.log(response);
        update();
    });
}

function update(){ //requests new messages from server (automatically every 10s)
    $.get('./chat.php', {req: "all"}, function(msgs){
      
      console.log(msgs);
      if(msgs){
        console.log("Updates Received: ");
        for(msg in msgs){
          $('<li>').text(msg).prependTo('.posts');
        }
      }
      else{/*temporary else for debugging*/
        console.log("msgs is empty");
      }
    });

}

var main=function(){
    //var repeat = setInterval(update, 500);
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
