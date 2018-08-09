//initial ball direction is down or up at random
var up = Math.round(Math.random());
//distance moved by AI and Player 
const epsilon = 20;
var hdist = 10; //horizontal distance traveled by stick
var bdist = 1; // distance traveled by ball (varies)
var bdist_restore = bdist;
if(up) bdist *= -1;

var mutex = 0 //lock to prevent multiple score increments
noPlayers = false;
var playerScore = 0;
var oppScore = 0;
var frameHeight;
var frameWidth;
var counter = 0; //use only for moveball function
var secondPlayer = false

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

function moveAI(level, key="#AI"){
    if(level === 3){//todo ML

    }
    if(level === 1){
        let ball = getInfo($("#ball"));
        let AI = getInfo($(key));
        if(Math.abs(AI.center[0] - ball.center[0]) < epsilon) 
            return;
        else if(AI.center[0] < ball.center[0])
            $(key).animate({left:'+=' + hdist+ 'px'},0);
        else
            $(key).animate({left:'-=' + hdist+ 'px'},0);
    }
}
function displayScore(){
    s = secondPlayer ? "Player 2: " : "Computer 2: "
    t = noPlayers ? "Computer 1: " : "Player 1: "
    $("#playerScore").text(t + playerScore);
    $("#oppScore").text(s + oppScore);


}
//returns true if object is inbounds
function inbounds(s, piece){
    dist = (piece.dom.id === "player" || piece.dom.id === "AI") ? hdist : bdist;

    if(s === "left" && piece.left - dist > 0) return true;
    if(s === "right" && piece.right + dist < frameWidth) return true;
    if(s === "top" && piece.top > 0) return true;
    if(s === "bottom" && piece.bottom < frameHeight) return true;
    return false;
}
var bhv = 0;
var bvv = bdist;

function moveball(){
    collisionHandler();
    $('#ball').animate({top: "+=" + bvv+ 'px'},0);
    $('#ball').animate({left: "+=" + bhv+ 'px'},0);
}
function collision(s, piece){
//returns if the piece collides with s
    let stick = getInfo($("#" + s));
    if(piece.right >= stick.left && piece.left <= stick.right){
        if(piece.bottom >= stick.top && piece.top <= stick.top)
            return true;
        else if(piece.top <= stick.bottom && piece.bottom >= stick.bottom)
            return true;

    }

    return false;

}
function resetBall(){
    displayScore();
    bdist = bdist_restore;
    $("#ball").css({"top":"50%", "left":"50%"});
    $(".stick").css({"left":"50%"});
    up = Math.round(Math.random());
    if(up) bdist = Math.abs(bdist) * -1;
    else bdist = Math.abs(bdist);
    bhv = 0;
    bvv = bdist;
    mutex = 0;
}
function ballRefract(s, piece){
    //determines how the ball should behave after a collision
    let stick = getInfo($("#" + s));
    w = stick.width / 2;
    let l1 = piece.center[0],
        l2 = stick.center[0];
    let d = l1 - l2;
    let pct = d/w;
    bhv = pct*Math.abs(bdist) / 2;
    console.log("new horizontal velocity: " + bhv);
    let dir = s === "AI" ? 1 : -1;
    bvv = dir*(Math.abs(bdist) - Math.abs(bhv));
    console.log("new vertical velocity: " + bvv);
    console.log("velocity sum: " + bdist);

}
function collisionHandler(){
    var ball = getInfo($("#ball"));
    ball.top += bvv;
    ball.left += bhv;
    if(!inbounds("left", ball)) bhv = Math.abs(bhv);
    if(!inbounds("right", ball)) bhv = -1*Math.abs(bhv);

    if(!inbounds("top", ball) && !mutex) {
        mutex = 1
        setTimeout( () =>{
            playerScore += 1;
            resetBall();
        }
        ,300);
    }
    if(!inbounds("bottom", ball) && !mutex) {
        mutex = 1
        setTimeout( () =>{
            oppScore += 1;
            resetBall();
        }
        ,300);
    }

    if(collision("player", ball)){
        ballRefract("player", ball);
        bdist = bdist < 0 ? bdist - .1 : bdist + .1;

    }
    else if(collision("AI", ball)){
        ballRefract("AI", ball);
        bdist = bdist < 0 ? bdist - .1 : bdist + .1;
    }

}




function getInfo(DOM){
    //Returns object based on DOM with properties center, top, bottom, left, right, width, and height
    var l = DOM.position().left,
    t = DOM.position().top;
    
    var b = t + DOM.height(),
    r = l + DOM.width();
    var cx = (l + r) / 2,
    cy = (t + b) / 2 ;

    var obj = {dom: DOM, top: t, left: l, bottom: b, right: r, center: [cx,cy], width: DOM.width(), height: DOM.height()};
    return obj;
} 

function setPlayers(n){
    if(n > 0){
        secondPlayer = true;
    }
    else if(n < 0){
        noPlayers = true;
    }
    $(".container").css("display", "block").fadeIn(2000);
    $("#score").css("display", "inline").fadeIn(2000);
    $(".numplayers").css({"display":"none"});
    
}

function movePlayers(keys){
    var player = getInfo($("#player"));
    var opp = getInfo($("#AI"));
    if(keys[37] || keys[39]){
        if(keys[37]){
            // Left arrow key pressed            
            if(inbounds("left", player)){
                $('#player').animate({left:'-=' + hdist+ 'px'},0);
                player = getInfo($("#player"));

            }
        
            if(keys[65]){
                if(secondPlayer){
                    if(inbounds("left", opp)){
                        $('#AI').animate({left:'-=' + hdist+ 'px'},0);
                        opp = getInfo($("#AI"));

                    }
                }
            }
            if(keys[68]){
                if(secondPlayer){
                    if(inbounds("right", opp)){
                        $('#AI').animate({left:'+=' + hdist+ 'px'},0);
                        opp = getInfo($("#AI"));

                    }
                }
            }


        }
            // Right Arrow Pressed
        if(keys[39]){
            if(inbounds("right", player)){
                $('#player').animate({left:'+=' + hdist+ 'px'},0);
                player = getInfo($("#player"));

            }
        
            if(keys[65]){
                if(secondPlayer){
                    if(inbounds("left", opp)){
                        $('#AI').animate({left:'-=' + hdist+ 'px'},0);
                        opp = getInfo($("#AI"));

                    }
                }
            }

            if(keys[68]){
                if(secondPlayer){
                    if(inbounds("right", opp)){
                        $('#AI').animate({left:'+=' + hdist+ 'px'},0);
                        opp = getInfo($("#AI"));

                    }
                }

            }

        }
    }
    else{
        if(keys[65]){
            if(secondPlayer){
                if(inbounds("left", opp)){
                    $('#AI').animate({left:'-=' + hdist+ 'px'},0);
                    opp = getInfo($("#AI"));

                }
            }
        }
        if(keys[68]){
            if(secondPlayer){
                if(inbounds("right", opp)){
                    $('#AI').animate({left:'+=' + hdist+ 'px'},0);
                    opp = getInfo($("#AI"));

                }
            }

        }
    }
}
var move;

function GameOver(){
    if(playerScore === 10){
        clearInterval(move);
        $(".container").css("display", "none");
        $("#victory").css("display", "block");
        resetBall();
    }    
    else if(oppScore === 10){
        clearInterval(move);
        $(".container").css("display", "none");
        $("#gameover").css("display", "block");
        resetBall();
    }

}
var main= function(){
    displayScore();
    adaptToFrame();

    $(window).resize(function() {
        adaptToFrame();
    });   


    var keys = {};

    $(document).keydown(function (e) {
        keys[e.which] = true;
        if([37, 39, 68, 65].indexOf(e.which) + 1) e.preventDefault();
    });

    $(document).keyup(function (e) {
        delete keys[e.which];
        if([37, 39, 68, 65].indexOf(e.which) + 1) e.preventDefault();
    });

    if(!secondPlayer){
        setInterval(() => moveAI(1), 25);
    }

    if(noPlayers){
        setInterval(() => moveAI(1, key="#player"), 25);

    }
    else{
        setInterval(() => movePlayers(keys), 10);
    }
    move = setInterval(moveball,2);
    setInterval(GameOver, 200);
        
    
};
start = () =>{
    
    if($(".numplayers").css("display") === "none"){ 
        $(document).ready(main);
        clearInterval(z);
    }        
}
var z = setInterval(start, 1000);