function generateAmenities(amenities) {
    const title = $('<h3></h3>').text('Amenities');
    const description = $('<h4></h4>').text('&nbsp;');
    const list = $('<ul></ul>');
    amenities.forEach(amenity => {
      const li = $('<li></li>').text(amenity.name);
      list.append();
    });
    const popover = $('div class="popover"></div>').text(list);
  }
  
  function generatePlaceTitleBox(place) {
    const priceByNight = $('<div class="price_by_night"></div>').text(place.price_by_night);
    const name = $('<h2 class="name"></h2>').text(place.name);
    const titleBox = $('<div class="title_box"></div>').append(name).append(priceByNight);
  
    return titleBox;
  }
  
  function generatePlaceInformation(place) {
    const maxGuest = $('<div class="max_guest"></div>').text(place.max_guest);
    const numberRooms = $('<div class="number_rooms"></div>').text(place.number_rooms);
    const numberBathrooms = $('<div class="number_bathrooms"></div>').text(place.number_bathrooms);
    const information = $('<div class="information"></div>').append(maxGuest).append(numberRooms).append(numberBathrooms);
  
    return information;
  }
  
  function generatePlace(place) {
    const titleBox = generatePlaceTitleBox(place);
    const information = generatePlaceInformation(place);
    const description = $('<div class="description"></div>').html(place.description);
    const article = $('<article></article>').append(titleBox).append(information).append(description);
  
    return article;
  }
  
  (function ($) {
    $.fn.populateTable = function (table, destElem) {
      let input = "";
  
      if (arguments[2] != undefined) {
        input = $(this).find("input");
      } else {
        input = $(this);
      }
      const id = input.attr('data-id');
      const name = input.attr('data-name');
  
      if (input.is(':checked')) {
        table[id] = name;
      } else {
        delete table[id];
      }
  
      destElem.text($.map(table, function (name) { return name; }).join(', '));
    }
  
    $.fn.populateTableOnInit = function (table, destElem) {
      this.each(function (key, value) {
        $(this).populateTable(table, destElem, true);
      });
    };
  
    $.fn.populateTableOnClick = function (table, destElem) {
      $(this).click(function () {
        $(this).populateTable(table, destElem);
      });
  
      return (this);
    };
  })(jQuery);
  
  $(document).ready(function () {
    const checkedAmenities = {};
    const checkedStates = {};
    const checkedCities = {};
  
    $('section.filters div.amenities ul li').populateTableOnInit(checkedAmenities, $('div.amenities h4'));
    $('section.filters div.locations ul > li').populateTableOnInit(checkedStates, $('div.locations h4'));
    $('section.filters div.locations ul > li > ul > li').populateTableOnInit(checkedCities, $('div.locations h4'));
  
    $('section.filters div.amenities input').populateTableOnClick(checkedAmenities, $('div.amenities h4'));
    $('section.filters div.locations ul > li > h2 input').populateTableOnClick(checkedStates, $('div.locations h4'));
    $('section.filters div.locations ul > li > ul > li input').populateTableOnClick(checkedCities, $('div.locations h4'));
  
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
      $.each(response, function (key, place) {
        $('section.places').append(generatePlace(place));
      });
    });
  
    $('button').click(function() {
        $.post(
            {
              url: 'http://0.0.0.0:5001/api/v1/places_search/',
              data: '{"amenities": ['+ $.map(checkedAmenities, function (value, key) { return '"'+key+'"'; }).join(', ') +'],"states": ['+ $.map(checkedStates, function (value, key) { return '"'+key+'"'; }).join(', ') +'],"cities": ['+ $.map(checkedCities, function (value, key) { return '"'+key+'"'; }).join(', ') +']}',
              dataType: 'json',
              contentType: 'application/json; charset=utf-8'
            }
          ).done(function (response) {
            $('section.places').empty();
  
            $.each(response, function (key, place) {
              $('section.places').append(generatePlace(place));
            });
          });
    });
  });
  
  $('span').click(function (){
    
  });