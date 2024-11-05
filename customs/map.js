$wt.map.render({ map: { height: 490 }}).ready(function (map) {
	
	map.smartcountries(["FR-","DE","US","ES*2","it*1","RS*0"], {
      insets: true
    }).border({
      weight: 2,
      color: "#444"
    }).addTo(map);
	
	map.markers([50,10]).icon({color: "black"}).addTo(map);
	
    var geoJson = 
	{
		"type": "FeatureCollection",
		"features": [
		{
			"type": "Feature",
			"properties": {
				"name": "France - square",
				"custom": "fr"
			},
			"geometry": {
				"type": "Polygon",
				"coordinates": [
				  [
					[
					  1.120606,
					  48.37028
					],
					[
					  1.120606,
					  49.525695
					],
					[
					  3.722169,
					  49.525695
					],
					[
					  3.722169,
					  48.37028
					],
					[
					  1.120606,
					  48.37028
					]
				  ]
				]
			},

		},
		{
		  "type": "Feature",
		  "properties": {
			"name": "Belgium - Multipolygon",
			"custom": "be"
		  },
		  "geometry": {
			"type": "Polygon",
			"coordinates": [
			  [
				[
				  4.056153,
				  51.175781
				],
				[
				  3.634278,
				  50.687888
				],
				[
				  4.987794,
				  50.070809
				],
				[
				  5.603029,
				  50.565114
				],
				[
				  5.356935,
				  51.054288
				],
				[
				  4.847169,
				  51.47264
				],
				[
				  4.056153,
				  51.175781
				]
			  ]
			]
		  }
		}

		]
	}

	map.geojson(geoJson).addTo(map);

});