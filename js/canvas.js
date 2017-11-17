var text = "";
var blur = false;

$(document).ready(function(){
  refresh();
  
})
function refresh() {
  var img = document.getElementById("img"),
	  ctx = img.getContext("2d"),
      image = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.height = 480;
  img.width = 640;
  //image.src = "http://placeimg.com/640/480/any?" + Math.random();
  image.src = "http://lorempixel.com/640/480?" + Math.random();
  //if (blur) {image.src = "https://picsum.photos/640/480/?blur?" + Math.random();}
  //else {image.src = "https://picsum.photos/640/480/?random?" + Math.random();}
  image.onload = function(){
    ctx.drawImage (image, 0,0, 640, 480);
	ctx.globalAlpha = 0.4;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 640, 480);
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "#ffffff";
	ctx.globalAlpha = 1;
	ctx.font = "30pt Tahoma";
	ctx.textBaseline = "center";
	ctx.textAlign = "center";
	text = quotes[Number(randomInteger(0, 483))];
	
	var maxWidth = 600; //размер поля, где выводится текст
    var lineHeight = 70;
    /*если мы знаем высоту текста, то мы можем
     предположить, что высота строки должна быть именно такой*/
	//marginTop = 140;
	
	//var lineHeight = 480 / (ctx.measureText(text).width / maxWidth);
	if ((ctx.measureText(text).width / maxWidth) > 6) {
	  ctx.font = "20pt Tahoma";
	  lineHeight = 50;
	}
	var marginTop = 320 / (ctx.measureText(text).width / maxWidth);
	
	var words = text.split(" ");
        var countWords = words.length;
        var line = "";
        for (var n = 0; n < countWords; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth) {
                ctx.strokeText(line, 320, marginTop);
				console.log (line);
                line = words[n] + " ";
                marginTop += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        ctx.strokeText(line, 320, marginTop);
		console.log(line);
	
  }
}
function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function blur() {
	blur = !blur;
}

function getText() {
  $.ajax({
    url: "http://fucking-great-advice.ru/api/random/censored/?",
	dataType: "json",
	success: function(data) {
	  text = data.text.replace(/&nbsp;/g, " ").replace(/&#151;/g, " -");
	}
  })
}