
// Do stuff when the page opens!
$(document).ready(function()
{
	fixSlide();
});

// The jQuery slide functions were jumpy, this fixes it.
function fixSlide()
{
	$('.section').before('<div class="slideFixer"></div>');
	$('.subSection').before('<div class="slideFixer"></div>');
	$('.superSubSection').before('<div class="slideFixer"></div>');

	$('.section').after('<div class="slideFixer"></div>');
	$('.subSection').after('<div class="slideFixer"></div>');
	$('.superSubSection').after('<div class="slideFixer"></div>');
}

// Sections
/////////////////////////

// Open the given section.
function openSection(sectionClass, sectionId)
{
	$('.' + sectionClass).slideUp();
	$('#' + sectionId).slideDown();
}

// Select the given section (toggles open/close).
function selectSection(sectionClass, sectionId)
{
	var originalDisplay = $('#' + sectionId).css('display');

	$('.' + sectionClass).slideUp();

	if (originalDisplay === 'none')
	{
		$('#' + sectionId).slideDown();
	}
}

function selectGalleryImage(galleryId, imageIndex)
{
	var images = document.getElementById(galleryId).getElementsByTagName('IMG');
	var captions = document.getElementById(galleryId).getElementsByTagName('DIV');
	for (index = 0; index < images.length; index++)
	{
		var image = images[index];
		var caption = captions[index];

		if (index === imageIndex && image.style.width !== '95%')
		{
			image.style.width = '95%';
			caption.style.display = 'block';
		}
		else
		{
			image.style.width = '45%';
			caption.style.display = 'none';
		}
	}
}

function setVideo(videoId, videoFile)
{
	var video = document.getElementById(videoId);
	video.src = videoFile;
}

// Maps
/////////////////////////

// Gertrude's Journey
function initGertrudeMap()
{
	var latlng = new google.maps.LatLng(44.0, 0.0);
	var map = new google.maps.Map(document.getElementById('gertrudeMap'), {zoom : 4, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

	var path =
	[
		new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
		new google.maps.LatLng(51.3814282, -2.3574537), // Bath, Bath and North East Somerset, UK
		new google.maps.LatLng(51.1727310, -1.7932490), // Stonehenge Rd, UK
		new google.maps.LatLng(51.3814282, -2.3574537), // Bath, Bath and North East Somerset, UK
		new google.maps.LatLng(51.4813069, -3.1804979), // Cardiff, UK
		new google.maps.LatLng(51.9931750, -4.9750314), // Fishguard, Pembrokeshire, UK
		new google.maps.LatLng(52.2730241, -6.3865618), // Rosslare, Co. Wexford, Ireland
		new google.maps.LatLng(53.3441040, -6.2674937), // Dublin, Co. Fingal, Ireland
		new google.maps.LatLng(52.8067765, -8.4415884), // Killaloe, Co. Clare, Ireland
		new google.maps.LatLng(53.5476339, -9.8947102), // Connemara National Park, Co. Galway, Ireland
		new google.maps.LatLng(53.9525385, -9.9965613), // Achill Island, Co. Mayo, Ireland
		new google.maps.LatLng(54.5972686, -5.9301088), // Belfast, UK
		new google.maps.LatLng(54.7210869, -5.7912053), // Carrickfergus, UK
		new google.maps.LatLng(55.9501755, -3.1875359), // Edinburgh, UK
		new google.maps.LatLng(53.7996388, -1.5491221), // Leeds, UK
		new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
		new google.maps.LatLng(51.5001524, -0.1262362), // Westminster, London, UK
		new google.maps.LatLng(51.1297054, 1.3111373), // Dover, Kent, UK
		new google.maps.LatLng(50.9512900, 1.8586860), // Calais, France
		new google.maps.LatLng(48.8566140, 2.3522219), // Paris, France
		new google.maps.LatLng(41.3879170, 2.1699187), // Barcelona, Spain
		new google.maps.LatLng(41.6468598, 1.1392149), // Tàrrega, Spain
		new google.maps.LatLng(41.3879170, 2.1699187), // Barcelona, Spain
		new google.maps.LatLng(40.7123115, 0.5799720), // Amposta, Spain
		new google.maps.LatLng(39.8086190, -0.1457780), // Moncofa, Spain
		new google.maps.LatLng(39.3826653, -0.3323321), // El Saler, Valencia, Spain
		new google.maps.LatLng(39.4702393, -0.3768049), // Valencia, Spain
		new google.maps.LatLng(36.7450300, -3.8766489), // Nerja, Spain
		new google.maps.LatLng(36.1449106, -5.3532522), // Gibraltar
		new google.maps.LatLng(35.7666667, -5.8000000), // Tangier, Morocco
		new google.maps.LatLng(34.0333333, -5.0000000), // Fes, Morocco
		new google.maps.LatLng(35.7666667, -5.8000000), // Tangier, Morocco
		new google.maps.LatLng(36.1449106, -5.3532522), // Gibraltar
		new google.maps.LatLng(38.0156245, -7.8652348), // Beja, Portugal
		new google.maps.LatLng(38.7069320, -9.1356321), // Lisbon, Portugal
		new google.maps.LatLng(43.3889678, -4.1091800), // Santillana del Mar, Spain
		new google.maps.LatLng(43.3789178, -2.9830019), // Sopelana, Spain
		new google.maps.LatLng(51.5001524, -0.1262362) // Westminster, London, UK
	];
    
	for (index in path)
	{
		new google.maps.Marker({position: path[index], map: map, icon: 'images/map-marker.png'});
	}
    
	new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
}

// Lucille's Journey
function initLucilleMap()
{
	var latlng = new google.maps.LatLng(44.0, 0.0);
	var map = new google.maps.Map(document.getElementById('lucilleMap'), {zoom : 4, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

	var path =
	[
		new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
		new google.maps.LatLng(54.5000000, -3.1666667), // Lake District National Park, UK
		new google.maps.LatLng(56.1066493, -4.6055145), // Loch Lomond, UK
		new google.maps.LatLng(56.2119444, -4.8108333), // The Cobbler, Argyll and Bute, UK
		new google.maps.LatLng(56.2305767, -5.0741311), // Inveraray, Argyll and Bute, UK
		new google.maps.LatLng(56.8187980, -5.1096570), // Fort William, Highland, UK
		new google.maps.LatLng(57.2912724, -6.2277051), // Isle Of Skye, UK
		new google.maps.LatLng(58.0231542, -5.3463077), // Achiltibuie, Highland, UK
		new google.maps.LatLng(57.3228575, -4.4243817), // Loch Ness, Highland, UK
		new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
		new google.maps.LatLng(51.1297054, 1.3111373), // Dover, Kent, UK
		new google.maps.LatLng(50.9512900, 1.8586860), // Calais, France
		new google.maps.LatLng(42.8179879, -1.6441835), // Pamplona, Spain
		new google.maps.LatLng(40.0563175, 0.0656539), // Benicasim, Spain
		new google.maps.LatLng(39.8086190, -0.1457780), // Moncofa, Spain
		new google.maps.LatLng(42.0028246, 0.7643949), // Àger, Spain
		new google.maps.LatLng(40.4166909, -3.7003454), // Madrid, Spain
		new google.maps.LatLng(37.1764874, -3.5979291), // Granada, Spain
		new google.maps.LatLng(36.5296879, -6.2926569), // Cadiz, Spain
		new google.maps.LatLng(37.3826400, -5.9962951), // Seville, Spain
		new google.maps.LatLng(37.1764874, -3.5979291), // Granada, Spain
		new google.maps.LatLng(37.0974735, -3.0295059), // Sierra Nevada National Park, Spain
		new google.maps.LatLng(36.8401638, -2.4679217), // Almería, Spain
		new google.maps.LatLng(36.7450300, -3.8766489), // Nerja, Spain
		new google.maps.LatLng(37.1764874, -3.5979291), // Granada, Spain
		new google.maps.LatLng(37.8847267, -4.7791517), // Cordoba, Spain
		new google.maps.LatLng(39.8567775, -4.0244759), // Toledo, Spain
		new google.maps.LatLng(40.4166909, -3.7003454), // Madrid, Spain
		new google.maps.LatLng(50.9512900, 1.8586860), // Calais, France
		new google.maps.LatLng(51.1297054, 1.3111373), // Dover, Kent, UK
		new google.maps.LatLng(52.9154232, -0.6402773) // Grantham, Lincolnshire, UK
	];
    
	for (index in path)
	{
		new google.maps.Marker({position: path[index], map: map, icon: 'images/map-marker.png'});
	}
    
	new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
}

