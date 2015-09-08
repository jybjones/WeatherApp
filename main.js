var API_URL = 'http://api.wunderground.com/api/7b7b50d6c7c89ebd/conditions/geolookup/forecast10day/q/';
var lookUp = document.querySelector('.lookup');
var locate = document.querySelector('.locationbtn');
var clothes = document.querySelector('.clothes');

/*lookup button function*/
lookUp.onclick = function () {
  clothes.innerHTML = "pantaloons";
  var zip = document.querySelector('input').value;

  getJSON(API_URL + zip + '.json', function (data) {
  	var currTemp = document.querySelector('.temp');
    var currLoc = document.querySelector('.location');
  	currLoc.innerHTML = data.current_observation.display_location.full;
  	currTemp.innerHTML = data.current_observation.temperature_string;
 data.current_observation.clothing_nothing;
	});
};

/*location button function*/
locate.onclick = function () {
  clothes.innerHTML = "nothing";
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    getJSON(API_URL + lat + "," + lon + '.json', function (data) {
  	var currLoc = document.querySelector('.location');
    var currTemp = document.querySelector('.temp');
      currLoc.innerHTML = data.current_observation.display_location.full;
      currTemp.innerHTML = data.current_observation.temperature_string;

    });
  });
};


/*/this is the actual function request here*/
function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };

  xhr.send();
}


