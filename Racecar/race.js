var speed = 0;
var acceleratingL = false;
var acceleratingR = false;
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
        switch(parseInt(key.which,10)) {
            // Left arrow key pressed
            case 37:

                    key.preventDefault();
                    acceleratingL = true;
                    acceleratingR = false;
                    break;

            // Right Arrow Pressed
            case 39:
                    key.preventDefault();
                    acceleratingR = true;
                    acceleratingL = false;
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
      $(document).keyup(function(key) {
            switch(parseInt(key.which,10)) {
                // Left arrow key pressed
                case 37:
                        acceleratingL = false;
                        break;

                // Right Arrow Pressed
                case 39:
                        key.preventDefault();
                        acceleratingR = false;
                        break;
           }
    });

}
function zro(speed){
    if(speed < 1 && speed > -1 )
      return 1; //ensures log returns 0
    return speed;

}

function accel(){
    //speed = Math.log(zro(speed))
    if(acceleratingR && speed >= 0){
      speed += 10;
    }
    else if(acceleratingL && speed <= 0){
      speed -= 10;

    }
    else if(acceleratingR){
      speed = -1*Math.floor(Math.log(zro(-1*speed/10)));
    }
    else if(acceleratingL){
      speed = Math.floor(Math.log(zro(speed/10)));
    }
    else{
      if(speed > 0){
        speed = Math.floor(Math.log(zro(speed/.7)));
      }
      else if(speed < 0){
        speed = -1*Math.floor(Math.log(zro(-1*speed/.7)));
      }
      //speed -= friction;
    }


}
function go(){
    $('#car').animate({left:'+=' + speed+ 'px'},5/*,"linear"*/);
    console.log(speed);
}
var main= function(){
    var drive = setInterval(go,50);
    var slow = setInterval(accel,500)
    $('#car').draggable()
    setInterval(changecolor, 3000);
    move();
    setInterval(center,.1);
};
$(document).ready(main);
