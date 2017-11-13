var token = "";
var url_photo = "";
var user_id = "";
var server_vk = "";
var photo_vk = "";
var hash_vk = "";
var photo_id = "";


function pictureAsBlob() {
    return convertImageToBlob(canvas.toDataURL());
}

function convertImageToBlob(dataURL) {
    var bytes = atob(dataURL.split(',')[1]);
    var arr = new Uint8Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) {
        arr[i] = bytes.charCodeAt(i);
    }
    return new Blob([arr], {type: 'image/png'});
}

function login() {
	VK.Auth.login(function(response) {
      if (response.session) {
        console.log("authorization ok");
	    user_id = response.session.user.id;
		vkGetUploadUrl();
      }, 4;
});
}

function post_vk() {
	var canvas_img = document.getElementById("img");
    var img = canvas_img.toDataURL("image/png");
	wallPost("", img, user_id);
}


function vkGetUploadUrl() {
    console.log("getting upload url");
    VK.Api.call("photos.getWallUploadServer", {}, function (r) {
        if (r.response) {
            vkUploadPicture(r.response.upload_url);
        } else {
            console.log("failed to get upload url");
        }
    });
}

function vkUploadPicture(uploadUrl) {
    console.log("uploading picture");

    var formData = new FormData();
    formData.append("url", uploadUrl);
    formData.append("photo", pictureAsBlob());

    $.ajax({
        url: uploadUrl,
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,

        success: function (response) {
            var responseDeserialized = JSON.parse(response);
            vkSavePicture(responseDeserialized.photo, responseDeserialized.server, responseDeserialized.hash);
        },
        error: function () {
            console.log("failed to upload");
        }
    });
}

function vkSavePicture(photo, server, hash) {
    console.log("saving picture");
    VK.Api.call("photos.saveWallPhoto", {photo: photo, server: server, hash: hash}, function (r) {
        if (r.response) {
            vkPostPicture(r.response[0].owner_id, r.response[0].id);
        } else {
            console.log("failed to save");
        }
    });
}

function vkPostPicture(ownerId, picId) {
    console.log("posting picture");
    VK.Api.call("wall.post", {owner_id: ownerId, attachments: picId}, function (r) {
        if (r.response) {
            console.log("PICTURE POSTED")
        } else {
            console.log("failed to post");
        }
    });
}

/*function get_photo_url() {
	$.ajax({
		url: "https://api.vk.com/method/photos.getWallUploadServer?v=5.69",
		dataType: "json",
		success: function(data) {
			url_photo = data.response.upload_url;
			user_id = data.response.user_id;
			console.log("step 1 successful");
			upload_photo();
		},
		error: function(){
			console.log("step 1 error");
			get_photo_url();
		}
	})
}

function upload_photo() {
	var canvas_img = document.getElementById("img");
	var img = canvas_img.toDataURL("image/png");
	var filename = "photo.png";
	var formdata = new FormData();
	formdata.append(filename, img);
	
	$.ajax({
		url: (url_photo),
		type: "POST",
		photo: formdata,
		success: function(data) {
			server_vk = data.server;
			photo_vk = data.photo;
			hash_vk = data.hash;
			console.log("step 2 successful");
			save_photo();
		},
		error: function(){
			console.log("step 2 error");
			upload_photo();
		}
		
	})
}

function save_photo() {
	$.ajax({
		url: "https://api.vk.com/method/photos.saveWallPhoto?user_id=" + user_id + 
			 "&photo=" + photo_vk + "&server=" + server_vk + "&hash=" + hash_vk +
			 "&v=5.69",
		success: function(data) {
			photo_id = data.response['0'].id;
			console.log("step 3 successful");
			post();
		},
		error: function(){
			console.log("step 3 error");
			save_photo();
		}
	})
}

function post() {
	$.ajax({
		url: "https://api.vk.com/method/wall.post?owner_id=" + user_id +
			 "&attachments=photo" + user_id + "_" + photo_id + "&v=5.69",
	    success: function() {
			console.log("step 4 successful");
		},
		error: function(){
			console.log("step 4 error");
			post();
		} 
	})
}*/

