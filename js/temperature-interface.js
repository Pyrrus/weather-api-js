var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  var json;
  var humidity;
  var currentTempFormat = 'celsius';
  var cityName;
  var list = [];
  var firstCity = false;

    $('#submitCity').click(function() {
      cityName = $('#city').val();
      $('#city').val('');
      $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + apiKey).then(function(response) {
          list = response.list;
          displayData();
          firstCity = true;
        });
    });

    function displayData() {
      var counter = 1;
      var day = 1;

      $("#display").append(
        "<div class='col-md-12'>"
          + "<h1>" + cityName + "</h1>"
        + "</div>");

      for (var i = 0; i < list.length; i++) {
        if (counter == 1) {
          $("#display").append(
            "<div class='col-md-12'>"
              + "<h1>Day " + day + "</h1>"
            + "</div>");
            day++;
        }
        $("#display").append(
          "<div class='col-md-4' id='col" + i + "'>"
            + "<h2>" + list[i].dt_txt + "</h2>"
            + "<h2>Weather Like: " + list[i].weather[0].description + "</h2>"
            + "<h3>humidity: " + list[i].main.humidity + "%</h3>"
            + "<h3>Min Kelvin: " + list[i].main.temp_min + "</h3>"
            + "<h3>Kelvin: " + list[i].main.temp + "</h3>"
            + "<h3>Max Kelvin: " + list[i].main.temp_max + "</h3>"
            + "<button type='button' class='cel' id='" + i + "'>Celsius</button>"
          + "</div>");

          if (counter % 8 == 0 && counter != 40) {
            $("#display").append(
              "<div class='col-md-12'>"
                + "<h1>Day " + day + "</h1>"
              + "</div>");
              day++;
          }

          counter++;
      }

      $(".cel").click(function () {
        var id = $(this).attr('id');
        $("#col" + id).html(
          "<h2>" + list[id].dt_txt + "</h2>"
          + "<h2>Weather Like: " + list[id].weather[0].description + "</h2>"
          + "<h3>humidity: " + list[id].main.humidity + "%</h3>"
          + "<h3>Min Celsius: " + Math.round(list[id].main.temp_min - 273.15) + "</h3>"
          + "<h3>Celsius: " + Math.round(list[id].main.temp - 273.15) + "</h3>"
          + "<h3>Max Celsius: " + Math.round(list[id].main.temp_max - 273.15) + "</h3>"
        );
      });
    }
});
