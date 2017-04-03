var msg_total;
function chat_send(msg){ //posts message requests to server
    console.log("sending message to server");
    $.post('./chat.php',{send: msg}, function(msg){
          console.log(msg);
    });
}
function getNumMgs(){
  $.post('./chat.php', {req: "reset"}, function(num){
    msg_total = num;
  });

}
function update(){ //requests new messages from server (automatically every 10s)
    $.get('./chat.php', {req: "all"}, function(msgs){
      if(msgs){
        console.log(msg_total);
        msgs = msgs.split('\n');
        for(var i = msg_total; i < msgs.length; i++){
          var msg = msgs[i];
          $('<li>').text(msg).prependTo('.posts');
          msg_total++;
          if(msg_total > 50){
            msg_total = getNumMgs();
          }
        }
      }

    });

}

var main=function(){
    msg_total = getNumMgs();
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
