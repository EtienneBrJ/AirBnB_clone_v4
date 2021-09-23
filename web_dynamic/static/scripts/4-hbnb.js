$(document).ready(function () {
    const checkedAmenities = {};
    $('input').click(function () {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');
  
      if ($(this).is(':checked')) {
        checkedAmenities[amenityId] = amenityName;
      } else {
        delete checkedAmenities[amenityId];
      }
      $('div.amenities h4').text($.map(checkedAmenities, function (amenityName) { return amenityName; }).join(', '));
    });

    $('button').click(function() {
        $.post(
            {
              url: 'http://0.0.0.0:5001/api/v1/places_search/',
              data: '{"amenities": ['+ $.map(checkedAmenities, function (key, amenityName) { return '"'+amenityName+'"'; }).join(', ') +']}',
              dataType: 'json',
              contentType: 'application/json; charset=utf-8'
            }
          ).done(function (response) {
            $('section.places').empty();
            
            // console.log(response);
            $.each(response, function (key, place) {
              const description = $('<div class="description"></div>').html(place.description);
              const maxGuest = $('<div class="max_guest"></div>').text(place.max_guest);
              const numberRooms = $('<div class="number_rooms"></div>').text(place.number_rooms);
              const numberBathrooms = $('<div class="number_bathrooms"></div>').text(place.number_bathrooms);
              const priceByNight = $('<div class="price_by_night"></div>').text(place.price_by_night);
              const name = $('<h2 class="name"></h2>').text(place.name);
              const titleBox = $('<div class="title_box"></div>').append(name).append(priceByNight);
              const information = $('<div class="information"></div>').append(maxGuest).append(numberRooms).append(numberBathrooms);
              const article = $('<article></article>').append(titleBox).append(information).append(description);
        
              $('section.places').append(article);
            });
          });
    });
  
    $.get(
      {
        url: 'http://0.0.0.0:5001/api/v1/status'
      }
    ).done(function (response) {
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
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
        const description = $('<div class="description"></div>').html(place.description);
        const maxGuest = $('<div class="max_guest"></div>').text(place.max_guest);
        const numberRooms = $('<div class="number_rooms"></div>').text(place.number_rooms);
        const numberBathrooms = $('<div class="number_bathrooms"></div>').text(place.number_bathrooms);
        const priceByNight = $('<div class="price_by_night"></div>').text(place.price_by_night);
        const name = $('<h2 class="name"></h2>').text(place.name);
        const titleBox = $('<div class="title_box"></div>').append(name).append(priceByNight);
        const information = $('<div class="information"></div>').append(maxGuest).append(numberRooms).append(numberBathrooms);
        const article = $('<article></article>').append(titleBox).append(information).append(description);
  
        $('section.places').append(article);
      });
    });
  });
    
