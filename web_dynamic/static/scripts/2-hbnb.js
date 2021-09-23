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
});
