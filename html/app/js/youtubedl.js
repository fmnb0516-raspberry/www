
(function() {
	var createListItem = function(ary) {
		var html = "";
		for (var i = 0; i < ary.length; i++) {
			html += "<li class='list-group-item'>" + ary[i] + "</li>"
		}
		return html;
	};
	
	var reloadItemList = function(callback) {
		var url = "/api/mediashow.php";
		
		$.ajax({
			type: "GET",
			cache: false,
			url: url,
			dataType: "json",
			success: function(data){
				$("#audio-list").html(createListItem(data["audios"]));
				$("#video-list").html(createListItem(data["videos"]));
				callback();
			}
		});
		
	};
	
	var downloadVideo = function(query, callback) {
		var url = "/api/youtubedl.php" + query;
		
		$.ajax({
			type: "GET",
			cache: false,
			url: url,
			dataType: "json",
			success: function(data){
				callback();
			}
		});
	};
	
	ViewManager.event("#youtube-dl", "init", function() {
		ViewManager.spin("start");
		reloadItemList(function() {
			ViewManager.spin("end", {delay:300});
		});
	});
	
	ViewManager.event("#youtube-dl", "destroy", function() {
		$("#youtube-dl button[type='reset']").click();
	});
	
	$(document).on("submit", "body[menu='#youtube-dl'] div#youtube-dl form", function(e) {
		var vid = $("#inputVid").val();
		var title = encodeURI($("#inputTitle").val());
		var type = $('input[name=mediaType]:checked').val()
		
		if(vid === "") {
			ViewManager.toast("error", "invalid parameter");
			return;
		}
		
		var query = "?vid="+vid+"&title="+title+"&type="+type;
		
		ViewManager.spin("start");
		downloadVideo(query, function() {
			reloadItemList(function() {
				ViewManager.spin("end", {delay:300});
			});
		});
		
		return false;
	});

})();