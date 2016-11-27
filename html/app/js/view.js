
var ViewManager = (function() {
	var exports = {};
	var $events = {};
	
	var callEvent = function(menu, type) {
		var func = $events[type + "-" + menu];
		if(typeof func === "function") {
			func();
		}
	};
	
	exports.event = function(menu, type, callback) {
		$events[type + "-" + menu] = callback;
	};
	
	exports.spin = function(type, option) {
	};
	
	exports.toast = function(type, message) {
	};
	
	exports.load = function(menu) {
		if(menu === "") {
			return;
		}
		
		var beforeMenu = $(".app-menu.active").attr("id");
		
		if(beforeMenu !== undefined) {
			callEvent($events[beforeMenu], "destroy");
		}
		
		$(".app-menu").removeClass("active");
		$(menu).addClass("active");
		
		callEvent(menu, "init");
		$("body").attr("menu", menu);
	};
	
	return exports;
})();

$(function() {
	$(window).on("hashchange", function() {
		 ViewManager.load(location.hash);
	});
	ViewManager.load(location.hash);
});