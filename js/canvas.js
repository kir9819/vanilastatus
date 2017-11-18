var text = "";
var WIDTH = 640;
var HEIGHT = 480;


$(document).ready(function(){
	document.getElementById("preloader_img").style.cssText = "min-height: " + HEIGHT + "px;";
	$('.materialboxed').materialbox();
  refresh();
})

function refresh() {
	document.getElementById("preloader_img").classList.remove("hide");
	document.getElementById("img_block").classList.add("hide");
	document.getElementById("text_up").classList.add("hide");
  getText2();
  var img = document.getElementById("img"),
	    ctx = img.getContext("2d"),
      image = new Image();

  img.height = HEIGHT;
  img.width = WIDTH;
  useCORS: false;
  image.src = "https://placeimg.com/" + WIDTH + "/" + HEIGHT + "/any?" + Math.random();
  //image.src = "http://lorempixel.com/640/480?" + Math.random();
  //else {image.src = "https://picsum.photos/640/480/?random?" + Math.random();}
  image.onload = function(){
		document.getElementById("preloader_img").classList.add("hide");
		document.getElementById("img_block").classList.remove("hide");
		document.getElementById("text_up").classList.remove("hide");
		ctx.drawImage (image, 0,0, WIDTH, HEIGHT);
		ctx.globalAlpha = 0.4;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "#ffffff";
		ctx.globalAlpha = 1;
		ctx.font = "30pt Tahoma";
		ctx.textBaseline = "center";
		ctx.textAlign = "center";

		var maxWidth = WIDTH - WIDTH / 10; //max width for text
    var lineHeight = 70;
    
	
	//var lineHeight = 480 / (ctx.measureText(text).width / maxWidth);
		if ((ctx.measureText(text).width / maxWidth) > 5) {
			// console.log ("a lot of text");
			ctx.font = "20pt Tahoma";
			lineHeight = 45;
		}
		var marginTop = (WIDTH/2) / (ctx.measureText(text).width / maxWidth);
		// console.log("matrinTop = " + marginTop + "\n " + ctx.measureText(text).width + "\n " + maxWidth);
		
		var words = text.split(" ");
		var countWords = words.length;
		var line = "";
		for (var n = 0; n < countWords; n++) {
			var testLine = line + words[n] + " ";
			var testWidth = ctx.measureText(testLine).width;
			if (testWidth > maxWidth) {
				ctx.strokeText(line, WIDTH/2, marginTop);
				// console.log (line);
				line = words[n] + " ";
				marginTop += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		ctx.strokeText(line, WIDTH/2, marginTop);
		// console.log(line);
  	}
  
  
}
function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function getText() {
  $.ajax({
    url: "http://fucking-great-advice.ru/api/random/censored/?",
		dataType: "json",
		success: function(data) {
	  	text = data.text.replace(/&nbsp;/g, " ").replace(/&#151;/g, " -");
	  	// console.log(text);
		},
		error: function() {
			text = quotes[Number(randomInteger(0, 483))];
		}
  })
}

function getText2() {
  $.ajax({
	url: "https://api.forismatic.com/api/1.0/get?method=getQuote&format=jsonp&lang=ru&jsonp=getText3",
	dataType: "jsonp",
	success: function(data) {
	  text = data.quoteText;
	  // console.log(text);
  	}
  })
}

function getText3(data) {
	text= data.quoteText;
	// console.log(text);
}