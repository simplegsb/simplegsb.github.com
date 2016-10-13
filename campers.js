angular
	.module('me.campers', [])
	.controller('me.campers', ['$scope', function($scope)
	{
		var gertrudeLocations =
		[
			'Grantham, Lincolnshire, UK',
			'Bath, Bath and North East Somerset, UK',
			'Stonehenge Rd, UK',
			'Bath, Bath and North East Somerset, UK',
			'Cardiff, UK',
			'Fishguard, Pembrokeshire, UK',
			'Rosslare, Co. Wexford, Ireland',
			'Dublin, Co. Fingal, Ireland',
			'Killaloe, Co. Clare, Ireland',
			'Connemara National Park, Co. Galway, Ireland',
			'Achill Island, Co. Mayo, Ireland',
			'Belfast, UK',
			'Carrickfergus, UK',
			'Edinburgh, UK',
			'Leeds, UK',
			'Grantham, Lincolnshire, UK',
			'Westminster, London, UK',
			'Dover, Kent, UK',
			'Calais, France',
			'Paris, France',
			'Barcelona, Spain',
			'Tarrega, Spain',
			'Barcelona, Spain',
			'Amposta, Spain',
			'Moncofa, Spain',
			'El Saler, Valencia, Spain',
			'Valencia, Spain',
			'Nerja, Spain',
			'Gibraltar',
			'Tangier, Morocco',
			'Fes, Morocco',
			'Tangier, Morocco',
			'Gibraltar',
			'Beja, Portugal',
			'Lisbon, Portugal',
			'Santillana del Mar, Spain',
			'Sopelana, Spain',
			'Westminster, London, UK'
		];

		var lucilleLocations =
		[
			'Grantham, Lincolnshire, UK',
			'Lake District National Park, UK',
			'Loch Lomond, UK',
			'The Cobbler, Argyll and Bute, UK',
			'Inveraray, Argyll and Bute, UK',
			'Fort William, Highland, UK',
			'Isle Of Skye, UK',
			'Achiltibuie, Highland, UK',
			'Loch Ness, Highland, UK',
			'Grantham, Lincolnshire, UK',
			'Dover, Kent, UK',
			'Calais, France',
			'Pamplona, Spain',
			'Benicasim, Spain',
			'Moncofa, Spain',
			'Ager, Spain',
			'Madrid, Spain',
			'Granada, Spain',
			'Cadiz, Spain',
			'Seville, Spain',
			'Granada, Spain',
			'Sierra Nevada National Park, Spain',
			'Almeria, Spain',
			'Nerja, Spain',
			'Granada, Spain',
			'Cordoba, Spain',
			'Toledo, Spain',
			'Madrid, Spain',
			'Calais, France',
			'Dover, Kent, UK',
			'Grantham, Lincolnshire, UK'
		];

		var directionsService = new google.maps.DirectionsService();

		$scope.$watch('$viewContentLoaded', function()
		{
			getDirections('gertrude', gertrudeLocations);
			getDirections('lucille', lucilleLocations);

			var onResize = function()
			{
				var mapWidth = Math.min(720, window.innerWidth * 0.4);
				if (window.innerWidth < 900)
				{
					mapWidth = window.innerWidth * 0.9;
				}

				$('#gertrude-map').width(mapWidth);
				$('#gertrude-map').height($('#gertrude-map').width() / 1.5);
				$('#lucille-map').width(mapWidth);
				$('#lucille-map').height($('#lucille-map').width() / 1.5);
			};
			onResize();
			$(window).resize(onResize);

			showGertrudeViewer();
		});

		function getDirections(camper, locations, directions)
		{
			var requestLocationCount = 10;
			if (locations.length <= 10)
			{
				requestLocationCount = locations.length;
			}
			else if (locations.length < 12)
			{
				// Make sure there are enough left over to make another valid request.
				requestLocationCount = locations.length - 2;
			}

			var directionsRequest =
			{
				origin: locations[0],
				destination: locations[requestLocationCount - 1],
				waypoints: createWaypoints(locations.slice(1, requestLocationCount - 1)),
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};

			directionsService.route(directionsRequest, function(response, status)
			{
				if (status == google.maps.DirectionsStatus.OK)
				{
					if (!directions)
					{
						directions = response;
					}
					else
					{
						combineDirections(directions, response);
					}
				}

				if (locations.length > requestLocationCount)
				{
					getDirections(camper, locations.splice(requestLocationCount - 1), directions);
				}
				else
				{
					var directionsRenderer = new google.maps.DirectionsRenderer({ markerOptions: { icon: 'images/camper.png' } });
					directionsRenderer.setMap(new google.maps.Map(document.getElementById(camper + '-map')));
					directionsRenderer.setDirections(directions);
				}
			});
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

		function combineDirections(directions, response)
		{
			// Strip the first two since they were already in the previous response.
			Array.prototype.push.apply(directions.geocoded_waypoints, response.geocoded_waypoints.slice(2));

			// Extend the bounds of the map view.
			directions.routes[0].bounds.union(response.routes[0].bounds);

			// Strip the first one since it was already in the previous response.
			//Array.prototype.push.apply(directions.routes[0].legs, response.routes[0].legs.slice(1));
			// That doesn't work but for some reason ignoring duplicates does...
			Array.prototype.push.apply(directions.routes[0].legs, response.routes[0].legs);

			// Ignore duplicates. This would be a bitch to solve and it probably doesn't matter.
			Array.prototype.push.apply(directions.routes[0].overview_path, response.routes[0].overview_path);
			directions.routes[0].overview_polyline =
				directions.routes[0].overview_polyline.concat(response.routes[0].overview_polyline);

			// Keep incrementing indices for each waypoint.
			var existingWaypointOrderLength = directions.routes[0].waypoint_order.length;
			for (var index = 0; index < response.routes[0].waypoint_order.length; index++)
			{
				directions.routes[0].waypoint_order.push(existingWaypointOrderLength + index);
			}
		}
	}]);
