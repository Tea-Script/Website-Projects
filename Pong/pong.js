//initial ball direction
var balldirection = "downleft";
//distance moved by AI and Player 
var leftRight = 20;
var time = 0;
var score = 0;
var oppScore = 0;
var frameHeight;
var frameWidth;
var counter = 0; //use only for moveball function
function adaptToFrame() {  
    /*We get the values*/
    $(".main").css({"height": $(window).height()});   
    var position_top = $(".main").offset().top;
    var position_left = $(".main").offset().left;  
    var width = $(".main").width();
    var height = $(".main").height(); 
    
    /*We set the values*/
    $(".container").css({"position": "absolute", "top": position_top, "left": position_left, "width": width, "height": height });   
    frameWidth = width;
    frameHeight = height;
    //console.log($(".container").position().top);
    //console.log($(".container").position().left);
     
}

function AIMove(){
    //controls AI stick movement
    var posBall = $("#ball").position().left;
    var posAI = $("#AI").position().left;
    if((posAI < posBall) /*&& inbounds("right", "AI")*/){
        $('#AI').animate({left:'+=' + leftRight+ 'px'},20);
    }
    else if (posAI > posBall && inbounds("left", "AI")){
        $('#AI').animate({left:'-=' + leftRight+ 'px'},20);
    }
}

//returns true if player is inbounds
function inbounds(s, piece){
    var pos1 = $(".container").position();
    var pos2 = $('#'+piece).position();
    var w1 = frameWidth;
    var w2 = $('#'+piece).width();
    var h1 = frameHeight;
    var h2 = $('#'+piece).height();
    //console.log(pos1);
    //console.log(pos2);
    
    if(s === 'left'){
        if(pos1.left >= pos2.left){
            if(piece === "ball"){
                balldirection  = balldirection.replace("left","right");
            }
            return false;
        }
    }
    else if(s === 'right'){
        if(pos1.left+ w1 <= pos2.left + w2){
            if(piece === "ball"){
                balldirection = balldirection.replace("right","left");
            }
            return false;
        }
    }
    else if(s === 'top'){
        if(pos1.top >= pos2.top){
            if(piece === "ball"){
                balldirection = "";
            }
            return false;
        }
    }
    else if(s === 'bottom'){
        if(pos1.top+h1 <= pos2.top+h2){
            if(piece === "ball"){
                balldirection = "";
            }
            return false;
        }
    }
    return true;

}

var ballspeedx = 2;
var ballspeedy = 4;

function moveball(){
    var boolV = true;
    var boolH = true;
    if ((balldirection.search("down") !== -1) && inbounds("bottom","ball")){
        $("#ball").animate({top: '+='+ ballspeedy + 'px'},1);
        boolV = false;   
    }
    else if ((balldirection.search("up") !== -1) && inbounds("top","ball")){
        $("#ball").animate({top: '-=' +ballspeedy + 'px'},1);   
        boolV = false;
    }
    
    if ((balldirection.search("left") !== -1) && inbounds("left","ball")){
        $("#ball").animate({left: '-=' +ballspeedx + 'px'},1);   
        boolH = false
    }
    else if ((balldirection.search("right") !== -1) && inbounds("right","ball")){
        $("#ball").animate({left: '+=' +ballspeedx+ 'px'},1);   
        boolH = false;
    }
    ballspeedx += .005;
    ballspeedy += .005; //increase ballspeed slowly over time
    if (boolV & !counter){
        resetBall();
        ballspeedx = 2;
        ballspeedy = 4
        while(counter < 2){
            var clock = setInterval(counter ++,1000);
        }
        balldirection = "downleft";
        clearInterval(clock);
        counter = 0;
        score++;
    }
}
function collision(s){
//determines what the ball should do when it collides with varius objects
    var ballTop = $("#ball").position().top;
    var ballBottom = $("#ball").position().top + $("#ball").height();
    var ballLeft = $("#ball").position().left;
    var ballRight = $("#ball").position().left + $("#ball").width();
    
    var sTop = $("#"+s).position().top;
    var sBottom = $("#"+s).position().top + $("#"+s).height();
    var sLeft = $("#"+s).position().left;
    var sRight = $("#"+s).position().left + $("#"+s).width();
    if(sLeft <= ballRight && sRight >= ballRight || sRight >= ballLeft && sLeft <= ballLeft){
        if(s==="AI" && ballTop <= sBottom && ballTop >= sTop)    return true;
        else if(s==="player" && ballBottom >= sTop && ballBottom <= sBottom) return true;
    }
    return false;
}
function resetBall(){
    //place ball at center of screen
    //var position_top = $(".container").height() / 2;
    //var position_left = $(".container").width() / 2;
    $("#ball").css({"top": "50%", "left": "50%"}); 
}

function ballRefract(player){
    //returns direction ball should bounce in after collision
    var midpoint = $('#'+player).position().left + $('#'+player).width()/2
    var ballMid = $('#ball').position().left + $('#ball').width()/2
    if(ballMid < midpoint && balldirection.search("left") !== -1){
        return "left";
    }
    else if(ballMid >= midpoint && balldirection.search("left") !== -1){
        return "right";
    }
    else if(ballMid >= midpoint && balldirection.search("right") !== -1){
        return "right";
    }
    else{
        return "left";
    }

}
function changeDirections(player){
    if(collision(player)){
        console.log(balldirection);
            if(player === "AI" && balldirection.search("up") !== -1){
                balldirection = balldirection.replace("up","down");
            }
            else if(player === "player" && balldirection.search("down") !== -1){
                balldirection = balldirection.replace("down","up");
            }
            else{
            var temp;
            }
            if(balldirection.search("left") !== -1){
                balldirection = balldirection.replace("left",ballRefract(player));
            }
            else if(balldirection.search("right") !== -1){
                balldirection = balldirection.replace("right",ballRefract(player));
            }




    }

}

var main= function(){
    adaptToFrame();

    $(window).resize(function() {
        adaptToFrame();
    });   


    $(".stick").draggable();
    $("#ball").draggable();
    var time = 1;
    var loop = setInterval(moveball, 30);
    var AILoop = setInterval(AIMove, 80); 
    var changedirections = setInterval(function() {
        changeDirections("AI");
        changeDirections("player");
            
    },1);

    $(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {
            // Left arrow key pressed            
            case 37:
                 console.log("leftkey");
                 if(inbounds("left","player")){
                    $('#player').animate({left:'-=' + leftRight+ 'px'},0);
                    break;
                                }
            // Right Arrow Pressed
            case 39:
                 if(inbounds("right","player")){
                    $('#player').animate({left:'+=' + leftRight+ 'px'},0);
                    break;
                                }
        }
                $(document).keyup(function(){
                    time = 1;
                });
    });
};
$(document).ready(main);        