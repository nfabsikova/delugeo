export function onselectPoisType(value) {
  // let poisDataG =  JSON.parse(sessionStorage.getItem('poisDataG'))
  if (!poisDataG) {
    return;
  }

  if (value === "All") {
    let originData = {
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
      features: poisDataG["features"],
      type: "FeatureCollection",
    };
    myMap.getSource("Graffiti").setData(poisDataG);
  } else if (value === "Offensive") {
    let featureList = [];
    poisDataG.features.map(function (feature, index) {
      if (feature.properties.type === 1) {
        featureList.push(feature);
      }
    });
    let originData = {
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
      features: featureList,
      type: "FeatureCollection",
    };
    myMap.getSource("Graffiti").setData(originData);
    // const filter = ['==', 'type', 1]
    // map.setFilter('Graffiti', filter);
  } else if (value === "Not_Offensive") {
    let featureList = [];
    poisDataG.features.map(function (feature, index) {
      if (feature.properties.type === 0) {
        featureList.push(feature);
      }
    });
    let originData = {
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
      features: featureList,
      type: "FeatureCollection",
    };
    myMap.getSource("Graffiti").setData(originData);
  }

  // console.log(value, 'valuevaluevalue');
}

async function createFillLayer(url, layerName, initField, baseMap) {
  // console.log(url, layerName, initField, baseMap,'=======================');
  let XMLHttp;
  let resultJson;
  if (window.XMLHttpRequest) {
    XMLHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    XMLHttp = new window.ActiveXObject();
  } else {
    alert("请升级至最新版本的浏览器");
  }
  if (XMLHttp != null) {
    XMLHttp.open("GET", url, true);
    XMLHttp.send(null);
    XMLHttp.onreadystatechange = async function () {
      if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
        const geoObj = await JSON.parse(XMLHttp.responseText);
        // console.log(geoObj, '22222222222222222222222222');
        const geometryType = geoObj.features[0].geometry.type;
        // console.log(geometryType,'geometryTypegeometryType');

        baseMap.addLayer({
          id: layerName,
          type: "fill",
          source: {
            type: "geojson",
            data: geoObj,
          },
          // 'layout': {
          //     'visibility': 'none'
          // },
          paint: {
            "fill-color": [
              "step",
              ["get", initField],
              "#FFEDA0",
              0,
              "#FED976",
              200,
              "#FEB24C",
              400,
              "#FD8D3C",
              600,
              "#FC4E2A",
              1000,
              "#E31A1C",
              1500,
              "#BD0026",
            ],
            "fill-outline-color": "#343434",
            "fill-opacity": 0.7,
          },
        });
      }
    };
  }
  return XMLHttp;
}

// ['get', 'point_count'],
// '#078700', 'Very Low',
// '#42E73A', 'Low',
// '#FFFC73','Medium',
// '#FF3100','High',
// '#A62000',

// ],

//  [
//     "case",
//     ["boolean", ["==", ["get", initField], "Very Low"], false], "#078700",
//     ["boolean", ["==", ["get", initField], "Low"], false], "#42E73A",
//     ["boolean", ["==", ["get", initField], "Medium"], false], "#FFFC73",
//     ["boolean", ["==", ["get", initField], "High"], false], "#FF3100",
// ],
