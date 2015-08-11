
function selectCamperSection(sectionClass, sectionId)
{
	selectSection(sectionClass, sectionId);

	setTimeout(initGertrudeMap, 1000);
	setTimeout(initGertrudeViewer, 1000);
}

function createWaypoints(locations)
{
	var waypoints = [];

	for (var index = 0; index < locations.length; index++)
	{
		waypoints.push({ location: locations[index], stopover: true });
	}

	return waypoints;
}

// Gertrude's Journey.
function initGertrudeMap()
{
	var map = new google.maps.Map(document.getElementById('gertrudeMap'));
	var directionsService = new google.maps.DirectionsService();

	var directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(map);
	//directionsRenderer.setPanel(directionsPanel);

	var stopoverLocations =
	[
		"Bath, Bath and North East Somerset, UK",
		"Stonehenge Rd, UK",
		"Bath, Bath and North East Somerset, UK",
		"Cardiff, UK",
		"Fishguard, Pembrokeshire, UK",
		"Rosslare, Co. Wexford, Ireland",
		"Dublin, Co. Fingal, Ireland"/*,
		"Killaloe, Co. Clare, Ireland",
		"Connemara National Park, Co. Galway, Ireland",
		"Achill Island, Co. Mayo, Ireland",
		"Belfast, UK",
		"Carrickfergus, UK",
		"Edinburgh, UK",
		"Leeds, UK",
		"Grantham, Lincolnshire, UK",
		"Westminster, London, UK",
		"Dover, Kent, UK",
		"Calais, France",
		"Paris, France",
		"Barcelona, Spain",
		"Tàrrega, Spain",
		"Barcelona, Spain",
		"Amposta, Spain",
		"Moncofa, Spain",
		"El Saler, Valencia, Spain",
		"Valencia, Spain",
		"Nerja, Spain",
		"Gibraltar",
		"Tangier, Morocco",
		"Fes, Morocco",
		"Tangier, Morocco",
		"Gibraltar",
		"Beja, Portugal",
		"Lisbon, Portugal",
		"Santillana del Mar, Spain",
		"Sopelana, Spain"*/
	];
	var waypoints = createWaypoints(stopoverLocations);

	var directionsRequest =
	{
		origin: "Grantham, Lincolnshire, UK",
		destination: "Westminster, London, UK",
		waypoints: waypoints,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	directionsService.route(directionsRequest, function (response, status)
	{
		if (status == google.maps.DirectionsStatus.OK)
		{
			directionsRenderer.setDirections(response);
		}
		else
		{
			//handle error
		}
	});
}

// Lucille's Journey.
function initLucilleMap()
{
	var map = new google.maps.Map(document.getElementById('lucilleMap'));

	/*var path =
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
		new google.maps.Marker({position: path[index], map: map, icon: 'images/camper.png'});
	}
    
	new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});*/
}

