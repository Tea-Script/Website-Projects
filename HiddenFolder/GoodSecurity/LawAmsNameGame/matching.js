function main(){

    images = ["alex.jpg", "audrey.jpg", "erin.jpg", "eugene.jpg", "ivanna.jpg", "jeanluc.jpg", "maria.jpg", "tamm.jpg", "vivien.jpg", "andrew.jpg",
              "dan.jpg", "maia.jpg", "nicole.jpg", "jackie.jpg", "haydn.jpg", "matt.jpg", "sam.jpg", "arthur.jpg", "chris.jpg", "niv.jpg", "falco.jpg","david.jpg"

            ];
    var img = document.getElementById("current");
    img.src = "./" + images[0]
    img.name = images[0].substring(0, images[0].indexOf('.'));
    var inpt = document.getElementById("answer");
    inpt.addEventListener("keydown", function(e){
        var key = e.which || e.keyCode || 0;
        var txt = this.value;
        txt = txt.toLowerCase();
        txt = txt === "mmat" ? "tamm" : txt;
        txt = txt === "ttam" ? "matt" : txt;
        txt = txt === "ar0d" ? "alex" : txt;
        txt = txt === "matthew" ? "matt": txt;
        txt = txt === "samuel" ? "sam" : txt;
        txt = txt === "namhee" ? "nicole" : txt;
        txt = txt === "artman" ? "arthur" : txt;
        txt = txt === "brawn" ? "david" : txt;
        txt = txt === "texas" ? "vivien" : txt;
        txt = txt.replace(/[^a-zA-Z]/g, '');

        if(key === 13){
            this.value = "";
            if(txt === img.name){
              alert("correct!");
              var nxt = Math.floor(Math.random() * images.length);
              var nxtImg = "./"+ images[nxt];
              while(nxtImg === img.src){
                nxt = Math.floor(Math.random() * images.length);
                nxtImg = "./"+ images[nxt];

              }
              img.src = nxtImg
              img.name = images[nxt].substring(0, images[nxt].indexOf('.'));
            }
            else{
              alert("Umm... No... you need to do better... like seriously?");

            }

        }


    });
}
