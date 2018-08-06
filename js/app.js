$(document).ready( function() {

  //SPLASH SCREEN
  $('#home').delay('3000').fadeIn('slow');


  // SEARCH
  $('#busca').keyup( function() {
    var palavra = $('#busca').val();
                  $('#result-busca').empty();
                  $('#nome').empty();
                  $("#lat-long").empty();
                  $('#descricao').empty();

    $.each(restaurantes, function(key, value) {
      var food = value.type.trim().toLowerCase().split(',')

      if(food.indexOf( $('#busca').val().trim().toLowerCase() ) >= 0) {
        var img = value.image
        var nome = value.name
        var myLat = value.latitude
        var myLong = value.longitude
        var desc = value.description

        $('#result-busca').append( $()'<img src="' + img + '" title="'+ nome +'" width="auto" height="150px" class="align-items-center px-2 py-2" data-toggle="modal" data-target="#window">');
        $('#result-busca').append('<img src="' + img + '" title="'+ nome +'" width="auto" height="150px" class="align-items-center px-2 py-2" data-toggle="modal" data-target="#window">');
        $('#nome').append(nome);
        $('#lat-long').append(myLat + ', ' + myLong);
        $('#descricao').append(desc);
        console.log('busca: ' + nome + ' - (' + myLat + ', ' + myLong + ') - ' + desc)
      }
    });
  });
});

//EXIBE MAPA
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initialize() {
  for(valor in restaurantes){
    var myLat = restaurantes[valor].latitude;
    var myLong = restaurantes[valor].longitude;

    var local = { lat: myLat,  lng: myLong };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: local
    });
    console.log(local);
  }

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  // Add a marker at the center of the map.
  addMarker(local, map);
}

function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

