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
function CreateHotSpot(mouseEvent){
	//alert(mouseEvent.latLng.lat());
	content='<form id="createTrip">請輸入活動名稱：<input type="text" name="title"><br/>'+
		'簡述：<textarea row="10" name="description"></textarea><br/>'+
		'開始時間<input type="text" name="start"    id="start"><br/>'+
		'結束時間<input type="text" name="end"    id="end"><br/>'+
		'<input type="hidden" name="uid" id="uid" value="testId">'+
		'<input type="hidden" name="lat" id="lat" value="'+ mouseEvent.latLng.lat() + '">' +
		'<input type="hidden" name="long" id="long" value="'+ mouseEvent.latLng.lng() +'">'+
		'</form>';

	openPopUpBox(content,600,300,'');
}

function SearchAddress(){
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById("address").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
					position: results[0].geometry.location
			});
		} else {
			alert("搜尋失敗原因: " + status);
		}
	});
}

function initialize(position) {
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var myOptions = {zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDoubleClickZoom: true
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
			myOptions);

	var image = new google.maps.MarkerImage('images/foot.png',
			null ,
			// The origin for this image is 0,0.
			new google.maps.Point(0,0),
			// The anchor for this image is the base of the flagpole at 0,32.
			new google.maps.Point(0, 40),
			new google.maps.Size(30, 40)
			);

	var marker = new google.maps.Marker({
		position: latlng, 
			map: map,
			title:"you are here(" + position.coords.latitude +"," + position.coords.longitude+")",
			icon: image
	});
	GetSpot();
	google.maps.event.addListener(map, 'dblclick', CreateHotSpot);
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
		spot.description + "<br /> 起始時間:" + spot.start +
		"<br /> 結束時間:" + spot.end + "</p>";

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
