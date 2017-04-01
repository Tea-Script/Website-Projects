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
                    speed = -1*Math.abs(speed);
                    speed-=1;
                    /*if(0 < speed < 1) speed = -5;
                    else if(speed > 0){
                          speed = Math.floor(((speed - 1)/7));
                    }*/
                    go();
                    break;
                              
            // Right Arrow Pressed
            case 39:
                    speed = Math.abs(speed);
                    key.preventDefault();
                    speed+=time;
                    /*if(-1 < speed < 0) speed = 5;
                    else if(speed < 0){
                        speed = Math.ceil(((speed + 1)/7));
                    }*/
                    go();
                    break;
            //Up Arrow pressed
            case 38:
                    $('#car').animate({top:'-=' + 25 + 'px'},10);
                    break;
            //Down Arrow pressed
            case 40:
                    $('#car').animate({top:'+=' + 25 + 'px'},10);
                    break;
        }
        $(document).keyup(function(){
            time = 0;
            clearInterval(heldDown);
            //var stop = setInterval(speed = Math.floor((speed - speed/Math.abs(speed))/7),50); 
        });
    });
}
var go = function(){
    $('#car').animate({left:'+=' + speed+ 'px'},15)
}
var main= function(){
    $('#car').draggable()
    setInterval(changecolor, 3000);
    move();
    //go();
    setInterval(center,10);
};
$(document).ready(main);