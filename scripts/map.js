var map;

function GPSloading(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initialize);
	}else{
		var position = new Object();
		position.coords.latitude = -34.397;
		position.coords.longitude = -150.644;
		initialize(position);
	}
}

function initialize(position) {
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var myOptions = {zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
			myOptions);

	var marker = new google.maps.Marker({
		position: latlng, 
			map: map,
			title:"you are here(" + position.coords.latitude +"," + position.coords.longitude+")"
	});
	GetSpot();
}

function DrowSpot(spot){
	var message = spot;
	var latlong = new google.maps.LatLng(spot.lat , spot.long);
	var marker = new google.maps.Marker({
		position: latlong, 
			map: map
	});
	marker.setTitle(spot.title);

	var msg = "<p>" + spot.title + "<br /><br />" + 
		spot.description + "<br />起始時間:" + spot.start +
		"<br />結束時間:" + spot.end + "</p>";

	var infowindow = new google.maps.InfoWindow(
			{ content: msg,
				size: new google.maps.Size(50,50)
			});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}

function GetSpot(){
	var serverRoot = 'http://kit.csie.ntu.edu.tw/WhatIsHot/server/index.php/';
	$.post(serverRoot + "HotSpot/GetHotSpot/", {minLat:1.0, maxLat:1000.0, minLong:1.0, maxLong:1000.0},  function(data){
		if ( data.result != true){
			alert(data.error_msg);
			return null;
		}else{
			var i =0;
			for (i = 0;i<data.num;i++){
				/*
				$.each(data.spot[i], function(key, value) {
					alert(key + ': ' + value);
				});
				*/
				DrowSpot(data.spot[i]);
			}

		}
	} ,'json');
}
