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
    $('div.amenities h4').text($.map(checkedAmenities, function(amenityName) { return amenityName}).join(', '));
  });
});
