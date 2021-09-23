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
});
