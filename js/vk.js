var token = "";
var url_photo = "";
var user_id = "";
var server_vk = "";
var photo_vk = "";
var hash_vk = "";
var photo_id = "";

function get_photo_url() {
	$.ajax({
		url: "https://api.vk.com/method/photos.getWallUploadServer?v=5.69",
		dataType: "json",
		success: function(data) {
			url_photo = data.response.upload_url;
			user_id = data.response.user_id;
			upload_photo();
		},
		error: get_photo_url();
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
			save_photo();
		},
		error: upload_photo();
		
	})
}

function save_photo() {
	$.ajax({
		url: "https://api.vk.com/method/photos.saveWallPhoto?user_id=" + user_id + 
			 "&photo=" + photo_vk + "&server=" + server_vk + "&hash=" + hash_vk +
			 "&v=5.69",
		success: function(data) {
			photo_id = data.response['0'].id;
			post();
		},
		error: save_photo();
	})
}

function post() {
	$.ajax({
		url: "https://api.vk.com/method/wall.post?owner_id=" + user_id +
			 "&attachments=photo" + user_id + "_" + photo_id + "&v=5.69",
		error: post();
	})
}
