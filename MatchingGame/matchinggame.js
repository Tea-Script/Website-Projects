var locations = [[0,1,2,3],
				[0,1,2,3],
				[0,1,2,3]]
var images = ["http://www.planwallpaper.com/static/images/Winter-Tiger-Wild-Cat-Images.jpg",
				"http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg",
				"http://blogs.plos.org/biologue/files/2015/03/issue-image-Feb.jpg",
				"http://theartmad.com/wp-content/uploads/2015/06/Chewbacca-1.png",
				"http://www.junkiemonkeys.com/wp-content/uploads/2015/11/5mxAOMW-931x1024.jpg",
				"http://static.giantbomb.com/uploads/original/0/6628/429121-revan_s_return_by_tansy9.jpg"];
images=images.concat(images)
var assgnImage = function(imageurl,id){ //for the given id and string, sets the bckgrd img of element #id 
	//Id of found image tag//
	$("#"+id).css("background-image","url("+imageurl +") ");
	};
var pause = false;
var wait;
function getRandomInt(min, max) {   //returns randint >max and <=min
  return Math.floor(Math.random() * (max - min)) + min;
}

  //the array of images is shuffled thoroughly
function RandomImage(images){
	var n=getRandomInt(0,images.length) 
	var m=n
	var array=[]
	for (; n < images.length; n++) {
		array.push(images[n]);
	};
	for (var i=m-1; i >=0; i--) {
		array.push(images[i]);
	};
	console.log(String(array));
	return array;
}

function noMatch(){
	for(var i=0;i<=images.length;i++){
		$("#"+i).removeClass("active");
		$("#"+i).removeClass("current");
		$("#"+i).addClass("default");
	}
        pause = false;
        clearTimeout(wait);
};

var main=function(){
	images=RandomImage(images);
	for(var i=0;i<=images.length;i++){
		assgnImage(images[i],i);
	};
	noMatch();
	$('.default').click(function(){
        if(!pause){
			if($('img').hasClass('active')===false){
				var id=this.id;
				$('#'+id).removeClass("default");
				$('#'+id).addClass("active");
			}
			

			else{
				var id=$(this).attr('id');
				$('#'+id).removeClass("default");
				$('#'+id).addClass("current");			
				var idd=$('.active').attr('id');
				if(id===idd){
	                                noMatch();
				}
				else if($('#'+id).css('background-image')=== $('#'+idd).css('background-image')&& $(this)!==$('.active')){
	                                pause = true;
					wait =window.setTimeout(function(){
					$('#'+id).remove();
					$('#'+idd).remove();
                                        pause = false;
					}, 100);
					if($(".default").length ===0){
					alert("Congratulations! You have won!");
					$(".main").prepend("<div><h1>May The Force Be With You</h1></div>");
					$(".main").prepend("<img class='special'>");
					$(".main").prepend('<h2 class = "force"><a href="http://ciaracoding.16mb.com/MatchingGame/">Click here to play again!</a></h2>');
			        }	
				}
		
				else{
	                                pause = true;
					wait =window.setTimeout(noMatch,1000);
					
		                }		
		    }
		}
	});
        	
}
$(document).ready(main);