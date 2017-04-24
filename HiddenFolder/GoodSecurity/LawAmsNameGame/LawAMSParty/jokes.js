function main(){
  var images = {"chris":"chris.jpg", "dan":"dan.jpg", "arthur":"arthur.jpg", "chris2":"falco.jpg", "dan2":"falco.jpg", "arthur2":"falco.jpg" };
  var img = document.getElementById("current");
  var inpt = document.getElementById("answer");
  inpt.addEventListener("keydown", function(e){
      var key = e.which || e.keyCode || 0;
      var txt = this.value;
      txt = txt.toLowerCase();
      txt = txt.replace(/[^a-zA-Z]/g, '');
      for( k in  images){
          if(k.indexOf(txt) !== -1){
            var nxtImg = "../"+ images[k];
            img.src = nxtImg;
            break;

          }
     }

      if(key === 13){
          inpt.value = "";
          console.log("enter pressed");
          if(txt in images){
            //var nxt = Math.floor(Math.random() * images.length);
            var nxtImg = "../"+ images[txt + "2"];
            img.src = nxtImg;
          }

      }


  });



}
