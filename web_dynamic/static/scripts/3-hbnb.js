$(document).ready(function () {
  var checkedAmenities = {};
  $('input').click(function () {
    var amenityId = $(this).attr('data-id');
    var amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    $('div.amenities h4').text($.map(checkedAmenities, function (amenityName) { return amenityName }).join(', '));
  });

  $.get(
    {
      url: "http://0.0.0.0:5001/api/v1/status"
    }
  ).done(function (response) {
    console.log(response);
    if (response.status == 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // $.ajax({url: 'http://0.0.0.0:5001/api/v1/places_search/', type: 'POST', data: { 'error': 'toto' },dataType: 'json',contentType: 'application/json; charset=utf-8'})
  $.post(
    {
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8'
    }
  ).done(function (response) {
    // console.log(response);
    $.each(response, function (key, place) {
      var description      = $('<div class="description"></div>').html(place.description);
      var max_guest        = $('<div class="max_guest"></div>').text(place.max_guest);
      var number_rooms     = $('<div class="number_rooms"></div>').text(place.number_rooms);
      var number_bathrooms = $('<div class="number_bathrooms"></div>').text(place.number_bathrooms);
      var price_by_night   = $('<div class="price_by_night"></div>').text(place.price_by_night);
      var name             = $('<h2 class="name"></h2>').text(place.name);
      var title_box        = $('<div class="title_box"></div>').append(name).append(price_by_night);
      var information      = $('<div class="information"></div>').append(max_guest).append(number_rooms).append(number_bathrooms);
      var article          = $('<article></article>').append(title_box).append(information).append(description);

      $('section.places').append(article);
    });
  });
});
