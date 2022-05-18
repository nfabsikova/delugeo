mapboxgl.accessToken = 'pk.eyJ1IjoibmluYWZhYnNpa292YSIsImEiOiJja2twaWZlMjQwYTFsMzBxbnE5dWo2Mjk1In0.XLvRzC0uK94qxRFEGWZ-fQ';

 // Load a new map in the 'map' HTML div
 var map = new mapboxgl.Map({
 container: 'map', // container id
 style: 'mapbox://styles/ninafabsikova/cl31ozdf9002014l49icsmobh', 
 center: [-15, 0], // starting position [lng, lat]
 zoom: 1.5, // starting zoom
 });

 map.on('load', function() {

    //add flood extents
    map.addLayer({
      id: 'extents',
      type: 'fill',
      source: {
        type: 'vector',
        url: 'mapbox://ninafabsikova.7sxe8hkc'
      },
      'source-layer': 'flood_extent-96moi8',
      'layout': {
        'visibility': 'visible'
      },
      paint: {
        'fill-color': [
          'match',
          ['get', 'MainCause2'],
          'Heavy rain',
          '#3b9da0',
          'Tropical storm/surge',
          '#22429b',
          'Snowmelt, ice',
          '#3dbbff',
          'Dam',
          '#b740f7',
          '#596073'
        ],
        'fill-opacity': 0.2
      },
      filter: ['==', ['number', ['get', 'ID']], 10000]
    })

  //add circles to map
  map.addLayer({
    id: 'floods',
    type: 'circle',
    source: {
      type: 'vector',
      url: 'mapbox://ninafabsikova.bdzdrcif',
      promoteId:'ID'
    },
    'source-layer': 'floods2-4x8fkq',
    'layout': {
      'visibility': 'visible'
    },
    paint: {
      'circle-color': [
        'match',
        ['get', 'MainCause2'],
        'Heavy rain',
        '#3b9da0',
        'Tropical storm/surge',
        '#22429b',
        'Snowmelt. ice',
        '#3dbbff',
        'Dam',
        '#b740f7',
        '#596073'
      ],
      'circle-opacity': {
        stops: [[2, 0.35], [8, 1]]
      },
      'circle-radius': {
        property: 'Dead',
        stops: [
          [{zoom: 2, value: 0}, 5], 
          [{zoom: 5, value: 0}, 5],
          [{zoom: 5, value: 1}, 9],
          [{zoom: 5, value: 100}, 13],
          [{zoom: 5, value: 1000}, 17],
          [{zoom: 5, value: 10000}, 21],
          [{zoom: 5, value: 100000}, 25]
        ]
      },
      'circle-stroke-color': 'black',
      'circle-stroke-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        3,
        0
      ]
    },
  })

})
 
  //add year slider
  document.getElementById('slider').addEventListener('input', (event) => {
   const year = parseInt(event.target.value);
 
   // update the map
   filterYear = ['==', ['number', ['get', 'year']], year];
   map.setFilter('floods', ['all', filterYear]);
 
   // update text in the UI
   document.getElementById('active-year').innerText = year;
 
   //update layer styling
   map.setPaintProperty('floods', 'circle-opacity', 0.8)
 
   //enable button
   document.getElementById('button').disabled = false;

 });
 
 //add buton for returning to all years
 document.getElementById('button').addEventListener('click', (event) => {
 
   map.setPaintProperty('floods', 'circle-opacity', {stops: [[2, 0.25], [8, 1]]})
 
   setTimeout(function(){
     map.setFilter('floods', null);
   },150);
 
     // update text in the UI
     document.getElementById('active-year').innerText = '1985 - 2021';
 
   //disable button
   document.getElementById('button').disabled = true;

   
 }) ;
 
 // add filter for cause of flood
document.getElementById('cause-legend').addEventListener('mouseover', function(e) {
  let cause = e.target.getAttribute('id');
  
  switch(cause) {
    case 'heavyRain':
      mainCause = 'Heavy rain';
      break;
    case 'tropicalStorm':
      mainCause = 'Tropical storm/surge';
      break;
    case 'snowmeltIce':
      mainCause = 'Snowmelt. ice'
      break;
    case 'dam':
      mainCause = 'Dam';
      break;
    case 'other':
      mainCause = 'Other';
      break;
  }

  if (document.getElementById('button').disabled) {
    map.setFilter('floods', ['==', ['get', 'MainCause2'], mainCause])
  } else {
    let filteredYear = parseInt(document.getElementById('slider').value);
    let yearFilter = ['==', ['number', ['get', 'year']], filteredYear]
    let causeFilter = ['==', ['get', 'MainCause2'], mainCause]
    
    map.setFilter('floods', ['all', yearFilter, causeFilter]);
  }
  
})

document.getElementById('cause-legend').addEventListener('mouseleave', function(e) {

  if (document.getElementById('button').disabled) {
    map.setFilter('floods');
  } else {
    let filteredYear = parseInt(document.getElementById('slider').value);
    map.setFilter('floods', ['==', ['number', ['get', 'year']], filteredYear]);
  }

})

//add filter for number of deaths 
document.getElementById('deaths-legend').addEventListener('mouseover', function(e) {
  let minDeaths = parseInt(e.target.getAttribute('id'));
  
  switch(minDeaths) {
    case 0:
      maxDeaths = 0;
      break;
    case 1:
      maxDeaths = 1000;
      break;
    case 1000:
      maxDeaths = 10000;
      break;
    case 100000:
      maxDeaths = 10000000000;
  }

  minDeathFilter = ['>=', ['get', 'Dead'], minDeaths];
  maxDeathFilter = ['<=', ['get', 'Dead'], maxDeaths]

  //update layer styling


  if (document.getElementById('button').disabled) {
    if (minDeaths == 1000 | minDeaths == 100000) {
      console.log('hello')
        map.setPaintProperty('floods', 'circle-opacity', 0.8)
    }
    setTimeout(function(){
      map.setFilter('floods', ['all', minDeathFilter, maxDeathFilter])
    },150);

  } else {
    let filteredYear = parseInt(document.getElementById('slider').value);
    let yearFilter = ['==', ['number', ['get', 'year']], filteredYear]
    
    map.setFilter('floods', ['all', yearFilter, minDeathFilter, maxDeathFilter]);

  }
})

document.getElementById('deaths-legend').addEventListener('mouseleave', function(e) {


  if (document.getElementById('button').disabled) {
    map.setPaintProperty('floods', 'circle-opacity', 0.35)
    
    setTimeout(function(){
      map.setFilter('floods');
    },150);


  } else {
    let filteredYear = parseInt(document.getElementById('slider').value);
    map.setFilter('floods', ['==', ['number', ['get', 'year']], filteredYear]);
  }

})

 
  //add popups
  var popup = new mapboxgl.Popup({offset:[120,-20],closeButton: false});

  let pointId = null;
 
  map.on('mousemove', 'floods', function(e) {
   var zoom = map.getZoom();
 
   if (!document.getElementById('button').disabled | zoom > 3.5) {
    if (e.features.length === 0) return;

      //create popup
     let properties = e.features[0].properties;
     popup
     .setLngLat(e.features[0].geometry.coordinates)
     .setHTML("<b>Country: </b>" + properties.Country +
             "<br><b>Year: </b>" + properties.year + 
             "<br><b>Main Cause: </b>" + properties.MainCause +
             "<br><b>Area: </b>" + properties.Area + " km<sup>2</sup>" +
             "<br><b>Dead: </b>" + properties.Dead+
             "<br><b>Displaced: </b>" + properties.Displaced)
     .addTo(map);

     //highlight point
     if (pointId) {
      map.removeFeatureState({
        source: 'floods',
        sourceLayer: 'floods2-4x8fkq',
        id: pointId
      });
    }

    pointId = properties.ID
    console.log(pointId)
  
    // When the mouse moves over the earthquakes-viz layer, update the
    // feature state for the feature under the mouse
    map.setFeatureState(
      {
        source: 'floods',
        sourceLayer: 'floods2-4x8fkq',
        id: pointId
      },
      {
        hover: true
      }
    );
    
     //show flood extent
     let id = e.features[0].properties.ID;
     map.setFilter('extents', ['==', ['number', ['get', 'ID']], id]);

     //change cursor to pointer
     map.getCanvas().style.cursor = 'pointer';
   }
 
  })
  .on('mouseleave', 'floods', function(e) {

    //remove point highlight
    if (pointId) {
      map.setFeatureState(
        {
          source: 'floods',
          sourceLayer: 'floods2-4x8fkq',
          id: pointId
        },
        {
          hover: false
        }
      );
    }
  
    pointId = null;

    if (document.getElementById('button').disabled) {
      map.setFilter('floods');
    } else {
      let filteredYear = parseInt(document.getElementById('slider').value);
      map.setFilter('floods', ['==', ['number', ['get', 'year']], filteredYear]);
    }

    popup.remove()
    map.getCanvas().style.cursor = '';
    map.setFilter('extents', ['==', ['number', ['get', 'ID']], 10000]);

  })


 