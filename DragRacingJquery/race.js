var speed = 0;
var time = 0;

function changecolor(){
    //changes color of #car
    hexcode = "#" + (Math.floor(Math.random()*parseInt("FFFFFF",16))).toString(16);
    //console.log(hexcode);
    $("#top,#bottom").css({"background-color":hexcode});

}

function center(){
    $(window)
        .scrollTop( $("#car").position().top -$(window).height() / 2)
        .scrollLeft( $("#car").position().left - $(window).width() / 2);
}

function move(){
   $(document).keydown(function(key) {
        time = 0;
        //console.log(speed);
        //if(stop !== null) clearInterval(stop);
        var heldDown = setInterval(time+=1,200); 
        switch(parseInt(key.which,10)) {
            // Left arrow key pressed
            case 37:
                    
                    key.preventDefault();
                    speed -= 20;
                    break;
                              
            // Right Arrow Pressed
            case 39:
                    speed += 20;
                    key.preventDefault();
                    break;
            //Up Arrow pressed
            case 38:
                    $('#car').animate({top:'-=' + 25 + 'px'},5/*,"linear"*/);
                    break;
            //Down Arrow pressed
            case 40:
                    $('#car').animate({top:'+=' + 25 + 'px'},5,"linear");
                    break;
        }
    });
}
function go(){
    $('#car').animate({left:'+=' + speed+ 'px'},15,"linear");
    console.log(speed);
}
function friction() {
    if(speed > 0)
        speed = Math.round(Math.log(speed*speed));
    else if(speed < 0)
        speed = -1*Math.round(Math.log(speed*speed));
}
var main= function(){
    var drive = setInterval(go,40);
    var slow = setInterval(friction,300)
    $('#car').draggable()
    setInterval(changecolor, 3000);
    move();
    setInterval(center,05);
};
$(document).ready(main);