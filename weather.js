$(document).ready(function() {//get coordinates
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var long = position.coords.longitude;
        var lat = position.coords.latitude;
        $("#long").html("<h6 id='long'>Longitude: " + long.toFixed(4) + "</h6>");
        $("#lat").html("<h6 id='lat'>Latitude: " + lat.toFixed(4) + "</h6>");
        //end location coordinates call
        $.getJSON("https://api.wunderground.com/api/377df2fc3888b004/conditions/q/" + lat + "," + long + ".json", function(data) {
            $("#location").html(data.current_observation.display_location.full);
            temp = data.current_observation.temp_f;
            $("#weather").html("<h4 id='weather'>Weather:  " + data.current_observation.weather + "</h4>")
            $("#temperature").html("<h4 id='temperature'>Temperature:  " + temp + " &degF</h4>")

            //toggle button btwn C and F          
            $("#units").on("click", function() {
                if (document.getElementById("units").value == "F to C") {
                  cTemp = (temp - 32) * 5 / 9
                  $("#temperature").html("<h4 id='temperature'>Temperature:  " + cTemp.toFixed(2) + " &degC</h4>")

                  (document.getElementById("units").value = "C to F");
                } else if (document.getElementById("units").value == "C to F") {
                  $("#temperature").html("<h4 id='temperature'>Temperature:  " + temp + " &degF</h4>")
                    (document.getElementById("units").value = "F to C");
                }
              }) //end toggle button
            var main = data.current_observation.weather;
            console.log(main.toLowerCase().indexOf("cloud"))
            switch (main) {
              case "Clear":
                $(".weathericon").html('<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>');
                break;
              case "Partly Cloudy":
                $(".weathericon").html('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
                break;
              case "Mostly Cloudy":
                $(".weathericon").html('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
                break;
              case "Scattered Clouds":
                $(".weathericon").html('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
                break;
              case "Overcast":
                $(".weathericon").html('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
                break;
              case "Rain":
                $(".weathericon").html('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
                break;
              case "Light Rain":
                $(".weathericon").html('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
                break;
              case "Heavy Rain":
                $(".weathericon").html('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
                break;
              case "Thunderstorm":
                $(".weathericon").html('<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>');
                break;
              case "Snow":
                $(".weathericon").html('<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>');
                break
            }
          }) //end JSON call
      }) // end navigator call
  } //end navigator if
});