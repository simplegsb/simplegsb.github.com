function setProfileImage()
{
    document.getElementById('profile_image').src = 'res/images/profile0' + Math.floor(Math.random() * 5) + '.jpg';
}

function homeSweetHomeMap()
{
    var latlng = new google.maps.LatLng(0.0, -110.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 2, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

    var path =
    [
        new google.maps.LatLng(-37.63010130, 175.94539370), // 62b Walford Road, Aongatete, Bay Of Plenty
        new google.maps.LatLng(52.9287310, -0.6319610), // Low Rd, Manthorpe, Grantham, NG31 8NQ, UK
        new google.maps.LatLng(-37.63010130, 175.94539370), // 62b Walford Road, Aongatete, Bay Of Plenty
        new google.maps.LatLng(-37.50432580, 175.93230610), // 370 Tuapiro Rd, Katikati
        new google.maps.LatLng(-37.78782920, 175.31195210), // 110 Knighton Rd, Hamilton, New Zealand
        new google.maps.LatLng(-37.79171310, 175.30059740), // 193b Galloway Street, Hamilton East, Waikato
        new google.maps.LatLng(37.6453400, -118.9673530), // 1566 Tavern Rd Mammoth Lakes, CA 93546, United States
        new google.maps.LatLng(-37.79195530, 175.30398860), // 227a Fox Street, Hamilton East, Waikato
        new google.maps.LatLng(-32.92432280, 151.74534310), // 16 Milton Street, Hamilton, New South Wales, Australia
        new google.maps.LatLng(-34.92221010, 138.60889530), // Vaughan Place, Adelaide, South Australia, Australia
        new google.maps.LatLng(50.8572480, -1.0915750), // Eastfield Road, Portsmouth, United Kingdom
        new google.maps.LatLng(53.5366540, -113.5157350), // 9835 113 St NW, Edmonton, AB T5K 1N4, Canada
        new google.maps.LatLng(37.1760712, -3.5942310), // Cuesta de Gomérez, 18009 Granada, España
        new google.maps.LatLng(-36.8487632, 174.7731214) // 1 Parliament St, Auckland Central
    ];
    
    for (index in path)
    {
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/home.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('home_sweet_home').className = 'linkless_link selected';
}

function thePhilippinesMap()
{
    var latlng = new google.maps.LatLng(12.0, 122.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 7, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

    var path =
    [
        new google.maps.LatLng(-36.9992609, 174.7879046), // Auckland Airport, New Zealand
        new google.maps.LatLng(22.3088856, 113.9141464), // Airport, Hong Kong
        new google.maps.LatLng(14.5833333, 120.9666667), // Manila, Philippines
        new google.maps.LatLng(14.8333333, 120.2833333), // Olongapo City, Philippines
        new google.maps.LatLng(13.0085173, 123.9972950), // Sorsogon City, Philippines
        new google.maps.LatLng(12.0147224, 123.8857747), // Masbate Island, Philippines
        new google.maps.LatLng(11.9804331, 121.9188660), // Boracay Island, Philippines
        new google.maps.LatLng(10.3591887, 123.8634544), // Cebu City, Philippines
        new google.maps.LatLng(12.0147224, 123.8857747), // Masbate Island, Philippines
        new google.maps.LatLng(13.0085173, 123.9972950), // Sorsogon City, Philippines
        new google.maps.LatLng(14.5833333, 120.9666667), // Manila, Philippines
        new google.maps.LatLng(22.3088856, 113.9141464), // Airport, Hong Kong
        new google.maps.LatLng(-36.9992609, 174.7879046) // Auckland Airport, New Zealand
    ];
    
    for (index in path)
    {
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/travel.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('the_philippines').className = 'linkless_link selected';
}

function snowboardingInTheUsaMap()
{
    var latlng = new google.maps.LatLng(36.0, -119.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 7, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

    var path =
    [
        new google.maps.LatLng(-36.9992609, 174.7879046), // Auckland Airport, New Zealand
        new google.maps.LatLng(34.0522342, -118.2436849), // Los Angeles, CA, USA
        new google.maps.LatLng(37.7705963, -119.5107708), // Yosemite National Park, CA, USA
        new google.maps.LatLng(37.6485460, -118.9720790), // Mammoth Lakes, CA, USA
        new google.maps.LatLng(34.0522342, -118.2436849), // Los Angeles, CA, USA
        new google.maps.LatLng(-36.9992609, 174.7879046) // Auckland Airport, New Zealand
    ];
    
    for (index in path)
    {
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/travel.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('snowboarding_in_the_usa').className = 'linkless_link selected';
}

function ozMap()
{
    var latlng = new google.maps.LatLng(-28.0, 147.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 5, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

    var path =
    [
        new google.maps.LatLng(-32.9166667, 151.7500000), // Newcastle NSW, Australia
        new google.maps.LatLng(-33.8689009, 151.2070914), // Sydney NSW, Australia
        new google.maps.LatLng(-32.9166667, 151.7500000), // Newcastle NSW, Australia
        new google.maps.LatLng(-27.4709331, 153.0235024), // Brisbane QLD, Australia
        new google.maps.LatLng(-28.0291003, 153.4313884), // Broadbeach QLD, Australia
        new google.maps.LatLng(-27.4709331, 153.0235024), // Brisbane QLD, Australia
        new google.maps.LatLng(-32.9166667, 151.7500000), // Newcastle NSW, Australia
        new google.maps.LatLng(-27.4709331, 153.0235024), // Brisbane QLD, Australia
        new google.maps.LatLng(-27.9989389, 153.3388564), // Nerang QLD, Australia
        new google.maps.LatLng(-27.4709331, 153.0235024), // Brisbane QLD, Australia
        new google.maps.LatLng(-32.9166667, 151.7500000), // Newcastle NSW, Australia
        new google.maps.LatLng(-16.9233991, 145.7738510), // Cairns QLD, Australia
        new google.maps.LatLng(-32.9166667, 151.7500000), // Newcastle NSW, Australia
        new google.maps.LatLng(-34.9286212, 138.5999594), // Adelaide SA, Australia
        new google.maps.LatLng(-32.9166667, 151.7500000), // Newcastle NSW, Australia
        new google.maps.LatLng(-37.8131869, 144.9629796), // Melbourne VIC, Australia
        new google.maps.LatLng(-34.9286212, 138.5999594), // Adelaide SA, Australia
        new google.maps.LatLng(-32.9166667, 151.7500000), // Newcastle NSW, Australia
    ];
    
    for (index in path)
    {
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/travel.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('oz').className = 'linkless_link selected';
}

function missionToEuropaMap()
{
    var latlng = new google.maps.LatLng(0.0, 90.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 2, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

    var path =
    [
        new google.maps.LatLng(-36.9992609, 174.7879046), // Auckland Airport, New Zealand
        new google.maps.LatLng(13.7234186, 100.4762319), // Bangkok, Thailand
        new google.maps.LatLng(9.7318753, 100.0135929), // Ko Phangan, Thailand
        new google.maps.LatLng(10.0956102, 99.8403959), // Ko Tao, Thailand
        new google.maps.LatLng(7.7434836, 98.7756556), // Ko Phi Phi Don, Thailand
        new google.maps.LatLng(7.6788889, 98.7650000), // Ko Phi Phi Lee, Thailand
        new google.maps.LatLng(7.9843109, 98.3307468), // Phuket, Thailand
        new google.maps.LatLng(13.7234186, 100.4762319), // Bangkok, Thailand
        new google.maps.LatLng(51.5001524, -0.1262362), // Westminster, London, UK
        new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
        new google.maps.LatLng(52.9551147, -1.1491718), // Nottingham, UK
        new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
        new google.maps.LatLng(51.3814282, -2.3574537), // Bath, Bath and North East Somerset, UK
        new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
        new google.maps.LatLng(53.7996388, -1.5491221), // Leeds, UK
        new google.maps.LatLng(53.9577018, -1.0822855), // York, UK
        new google.maps.LatLng(53.7996388, -1.5491221), // Leeds, UK
        new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
        new google.maps.LatLng(51.5001524, -0.1262362), // Westminster, London, UK
        new google.maps.LatLng(48.8566140, 2.3522219), // Paris, France
        new google.maps.LatLng(44.8377890, -0.5791800), // Bordeaux, France
        new google.maps.LatLng(42.8179879, -1.6441835), // Pamplona, Spain
        new google.maps.LatLng(41.6562873, -0.8765379), // Saragossa, Spain
        new google.maps.LatLng(41.3879170, 2.1699187), // Barcelona, Spain
        new google.maps.LatLng(43.6960360, 7.2655920), // Nice, France
        new google.maps.LatLng(43.7397222, 7.4272222), // Monte Carlo, Monaco
        new google.maps.LatLng(43.7161354, 10.3965843), // Pisa, Italy
        new google.maps.LatLng(43.7687324, 11.2569013), // Florence, Italy
        new google.maps.LatLng(41.8905198, 12.4942486), // Rome, Italy
        new google.maps.LatLng(40.5509104, 14.2429262), // Capri, Italy
        new google.maps.LatLng(39.6192990, 19.9195850), // Corfu, Greece
        new google.maps.LatLng(45.4343363, 12.3387844), // Venice, Italy
        new google.maps.LatLng(48.2081743, 16.3738189), // Vienna, Austria
        new google.maps.LatLng(48.1391265, 11.5801863), // Munich, Germany
        new google.maps.LatLng(46.5955200, 7.9073500), // Lauterbrunnen, Switzerland
        new google.maps.LatLng(51.2249429, 6.7756524), // Düsseldorf, Germany
        new google.maps.LatLng(52.3730556, 4.8922222), // Amsterdam, Netherlands
        new google.maps.LatLng(52.5126500, 5.0493735), // Edam, Netherlands
        new google.maps.LatLng(51.5001524, -0.1262362) // Westminster, London, UK
    ];
    
    for (index in path)
    {
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/travel.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('mission_to_europa').className = 'linkless_link selected';
}

function gertrudeMap()
{
    var latlng = new google.maps.LatLng(44.0, 0.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 4, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

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
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/travel.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('gertrude').className = 'linkless_link selected';
}

function canadiaMap()
{
    var latlng = new google.maps.LatLng(48.0, -97.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 4, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

    var path =
    [
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(49.5041667, -115.0627778), // Fernie, BC, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(51.1780556, -115.5719444), // Banff, AB, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(50.4583706, -116.2384660), // Panorama, BC, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(49.2612260, -123.1139268), // Vancouver, BC, Canada
        new google.maps.LatLng(49.1524340, -125.9024930), // Tofino, BC, Canada
        new google.maps.LatLng(48.9398060, -125.5444460), // Ucluelet, BC, Canada
        new google.maps.LatLng(48.4286111, -123.3655556), // Victoria, BC, Canada
        new google.maps.LatLng(48.3761550, -123.7378930), // Sooke, BC, Canada
        new google.maps.LatLng(48.4286111, -123.3655556), // Victoria, BC, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(43.6535240, -79.3839069), // Toronto, ON, Canada
        new google.maps.LatLng(43.2436030, -79.8890750), // Hamilton, ON, Canada
        new google.maps.LatLng(43.6535240, -79.3839069), // Toronto, ON, Canada
        new google.maps.LatLng(43.0903891, -79.0861076), // Niagara Falls, ON, Canada
        new google.maps.LatLng(43.6535240, -79.3839069), // Toronto, ON, Canada
        new google.maps.LatLng(44.2635650, -76.5033600), // Kingston, ON, Canada
        new google.maps.LatLng(45.5088889, -73.5541667), // Montreal, QC, Canada
        new google.maps.LatLng(46.1877070, -74.6099360), // Mont-Tremblant, QC, Canada
        new google.maps.LatLng(45.5088889, -73.5541667), // Montreal, QC, Canada
        new google.maps.LatLng(46.8032826, -71.2427960), // Quebec, QC, Canada
        new google.maps.LatLng(45.5088889, -73.5541667), // Montreal, QC, Canada
        new google.maps.LatLng(43.6535240, -79.3839069), // Toronto, ON, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(51.0450000, -114.0572222), // Calgary, AB, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(53.8276710, -113.3317030), // Gibbons, AB, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(53.0324720, -117.3265290), // Cadomin, AB, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(51.1780556, -115.5719444), // Banff, AB, Canada
        new google.maps.LatLng(49.8801000, -119.4436000), // Kelowna, BC, Canada
        new google.maps.LatLng(49.2612260, -123.1139268), // Vancouver, BC, Canada
        new google.maps.LatLng(47.6062095, -122.3320708), // Seattle, WA, USA
        new google.maps.LatLng(50.6761111, -120.3408333), // Kamloops, BC, Canada
        new google.maps.LatLng(50.7251660, -120.5071310), // Tranquille, BC, Canada
        new google.maps.LatLng(50.6761111, -120.3408333), // Kamloops, BC, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(51.2962330, -116.9629960), // Golden, BC, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(52.9466462, -117.9261262), // Jasper National Park, AB, Canada
        new google.maps.LatLng(53.5435640, -113.4904520), // Edmonton, AB, Canada
        new google.maps.LatLng(53.5435640, -113.4904520) // Edmonton, AB, Canada
    ];
    
    for (index in path)
    {
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/travel.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('canadia').className = 'linkless_link selected';
}

function anOddOdysseyMap()
{
    var latlng = new google.maps.LatLng(44.0, 13.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 4, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

    var path =
    [
        new google.maps.LatLng(52.9154232, -0.6402773), // Grantham, Lincolnshire, UK
        new google.maps.LatLng(51.5001524, -0.1262362), // Westminster, London, UK
        new google.maps.LatLng(53.3441040, -6.2674937), // Dublin, Co. Fingal, Ireland
        new google.maps.LatLng(51.5001524, -0.1262362), // Westminster, London, UK
        new google.maps.LatLng(48.8566140, 2.3522219), // Paris, France
        new google.maps.LatLng(51.5001524, -0.1262362), // Westminster, London, UK
        new google.maps.LatLng(58.7531378, 17.0085329), // Nyköping, Sweden
        new google.maps.LatLng(59.3327881, 18.0644881), // Stockholm, Sweden
        new google.maps.LatLng(57.6496840, 18.7144680), // Gotland, Sweden
        new google.maps.LatLng(55.7028541, 13.1929125), // Lund, Sweden
        new google.maps.LatLng(55.6934030, 12.5830460), // Copenhagen, Denmark
        new google.maps.LatLng(59.3327881, 18.0644881), // Stockholm, Sweden
        new google.maps.LatLng(58.7531378, 17.0085329), // Nyköping, Sweden
        new google.maps.LatLng(51.5001524, -0.1262362), // Westminster, London, UK
        new google.maps.LatLng(27.8598000, 34.2824000), // Sharm El Sheikh, Sinai, Egypt
        new google.maps.LatLng(28.5010000, 34.5134000), // Dahab, Sinai, Egypt
        new google.maps.LatLng(28.5377778, 33.9744444), // Mt. Sinai, Sinai, Egypt
        new google.maps.LatLng(28.5010000, 34.5134000), // Dahab, Sinai, Egypt
        new google.maps.LatLng(30.0647420, 31.2495090), // Cairo, Egypt
        new google.maps.LatLng(30.0762920, 31.2089030), // Giza, Egypt
        new google.maps.LatLng(30.0647420, 31.2495090), // Cairo, Egypt
        new google.maps.LatLng(25.7006000, 32.6392000), // Luxor, Egypt
        new google.maps.LatLng(24.0888889, 32.8997222), // Aswan, Egypt
        new google.maps.LatLng(22.3467000, 31.5951000), // Abu Simbel, Egypt
        new google.maps.LatLng(24.0888889, 32.8997222), // Aswan, Egypt
        new google.maps.LatLng(24.9831000, 32.8743000), // Edfu, Egypt
        new google.maps.LatLng(25.2970000, 32.5534000), // Esna, Egypt
        new google.maps.LatLng(25.7006000, 32.6392000), // Luxor, Egypt
        new google.maps.LatLng(27.1837810, 31.1850490), // Asyut, Egypt
        new google.maps.LatLng(25.4489000, 30.5401000), // Kharga Oasis, Egypt
        new google.maps.LatLng(25.4116080, 29.0030580), // Dakhla Oasis, Egypt
        new google.maps.LatLng(28.3476000, 28.8557000), // Bawiti, Egypt
        new google.maps.LatLng(30.0647420, 31.2495090), // Cairo, Egypt
        new google.maps.LatLng(28.5010000, 34.5134000), // Dahab, Sinai, Egypt      
        new google.maps.LatLng(27.8598000, 34.2824000), // Sharm El Sheikh, Sinai, Egypt  
        new google.maps.LatLng(51.5001524, -0.1262362), // Westminster, London, UK
        new google.maps.LatLng(52.9154232, -0.6402773) // Grantham, Lincolnshire, UK
    ];
    
    for (index in path)
    {
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/travel.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('an_odd_odyssey').className = 'linkless_link selected';
}

function lucilleMap()
{
    var latlng = new google.maps.LatLng(44.0, 0.0);
    var map = new google.maps.Map(document.getElementById('content'), {zoom : 4, center : latlng, mapTypeId : google.maps.MapTypeId.ROADMAP});

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
        new google.maps.Marker({position: path[index], map: map, icon: 'res/images/travel.png'});
    }
    
    new google.maps.Polyline({strokeColor: '#532009', map: map, path: path});
    
    deselectMap();
    document.getElementById('lucille').className = 'linkless_link selected';
}

function deselectMap()
{
    document.getElementById('home_sweet_home').className = 'linkless_link';
    document.getElementById('the_philippines').className = 'linkless_link';
    document.getElementById('snowboarding_in_the_usa').className = 'linkless_link';
    document.getElementById('oz').className = 'linkless_link';
    document.getElementById('mission_to_europa').className = 'linkless_link';
    document.getElementById('gertrude').className = 'linkless_link';
    document.getElementById('canadia').className = 'linkless_link';
    document.getElementById('an_odd_odyssey').className = 'linkless_link';
    document.getElementById('lucille').className = 'linkless_link';
}