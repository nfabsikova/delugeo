window.onload = () => {
    const camera = document.querySelector('a-camera');
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '?';
};

var places = JSON.parse(JSON.stringify(Data)); // map marker info
var zones = JSON.parse(JSON.stringify(riskzone)); // flood risk zone geogrpahical polygons

var objects = [
    {
        name: 'test0',
        info: 'Flood Risk Here: 0%',
        scale: {
            x: 0.01,
            y: 0.01,
            z: 0.01,
        },
        color: 'white',
    },
    {
        name: 'test',
        info: 'Flood Risk Here: 0~0.1%',
        scale: {
            x: 0.01,
            y: 0.01,
           z: 0.01,
        },
        color: 'green',
    },
    {
        name: 'test1',
        info: 'Flood Risk Here: 0.1~1%',
        scale: {
            x: 0.01,
            y: 0.01,
            z: 0.01,
        },
        color: 'yellow',
    },
    {
        name: 'test2',
        info: 'Flood Risk Here: 1~3.3%',
        scale: {
            x: 0.01,
            y: 0.01,
            z: 0.01,
        },
        color: 'orange',
    },
    {
        name: 'test3',
        info: 'Flood Risk Here: 3.3%~',
        scale: {
            x: 0.01,
            y: 0.01,
            z: 0.01,
        },
        color: 'red',
    },
]

var index = 0;

var setObject = function (obj, entity) {

    entity.setAttribute('name', obj.name);
    entity.setAttribute('color', obj.color);
    entity.setAttribute('scale', obj.scale);

    const div = document.querySelector('.instructions');
    div.innerText = obj.info;
    div.style.color = obj.color;
};

var isPointInMultiPoly = function (point, vs) {

    var isPointInPoly = function (point, vs) {
        var x = point[1], y = point[0];
    
        var inside = false;
        for (var i = 0 , j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];
    
            var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) {
                inside = !inside}; 
        }
        return inside;
    };

    var init_stat = false;
    vs.forEach((poly) => {
        if (isPointInPoly(point, poly.coords)) {
            init_stat = true;
            if (poly.risk === "Very Low") {index = 1} 
            else if (poly.risk === "Low") {index = 2} 
            else if (poly.risk === "Medium") {index = 3} 
            else if (poly.risk === "High") {index = 4}
        };
        return init_stat
    });
    
};

let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 51.50098589893901, lng: -0.12459364123706065},
      zoom: 16,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.querySelector('button[data-action="change"]');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        console.log('click')
    navigator.geolocation.getCurrentPosition(
        (position) => {
        console.log('gps')
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Current Location");
        infoWindow.open(map);
        map.setCenter(pos);
        console.log(pos)
        },
        () => {
            alert("GPS Error!")
        }
    );
    
    });
}
  
window.initMap = initMap;
  
navigator.geolocation.getCurrentPosition(setPos, error)
function error() {
    alert("GPS Error!")
};

function setPos(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    alert("This app shows flood risk zone of the current location. Press '?' button to check the risk.")
    //notifying the current location
    alert("Your location is : " + latitude + ", " + longitude)

    //setting the start point
    let text1 = document.createElement('a-text');
    text1.setAttribute('value', 'START');
    text1.setAttribute('scale', '60 60 60');
    text1.setAttribute('look-at', '[camera]');
    text1.setAttribute('color', 'blue');
    text1.setAttribute('gps-entity-place', {
        latitude: latitude+0.0006,
        longitude: longitude-0.0005
    })

    const sceneEl = document.querySelector("a-scene");
    sceneEl.appendChild(text1);

    let obje = document.createElement('a-box');    
    obje.setAttribute('gps-entity-place', {
        latitude: latitude-0.0006,
        longitude: longitude+0.0005
    });
    obje.setAttribute('look-at', '[camera]');

    setObject(objects[index], obje);
    obje.setAttribute('animation-mixer', '');

    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        var entity = document.querySelector('[gps-entity-place]');
        
        var coord = [latitude, longitude];
        console.log(latitude + ',' + longitude)
        isPointInMultiPoly(coord, zones);
        setObject(objects[index], entity);
        console.log(index);            
    });
    
    sceneEl.appendChild(obje);

    places.forEach((place) => {
        
        let lat = place.latitude;
        let long = place.longitude;

        const placeText = document.createElement('a-link');
        placeText.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${long};`);
        placeText.setAttribute('title', place.NAME);
        placeText.setAttribute('scale', '10 10 10');
        //placeText.setAttribute('href', 'https://check-for-flooding.service.gov.uk/location?q='+ place.postcode.split(" ")[0] + "%20" + place.postcode.split(" ")[1])

        placeText.addEventListener('click', function () {
            location.href = 'https://check-for-flooding.service.gov.uk/location?q='+ place.postcode.split(" ")[0] + "%20" + place.postcode.split(" ")[1];
            console.log(location.href); 
    });

        sceneEl.appendChild(placeText);
/* marker image instead of a-link
        const icon = document.createElement('a-image');
        icon.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${long}`);
        icon.setAttribute('name', place.index)
        icon.setAttribute('src', '../assets/blue.png');
        icon.setAttribute('scale', '20, 20');
        icon.setAttribute('look-at', '[camera]');

        icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            const name = ev.target.getAttribute('name');

            const el = ev.detail.intersection && ev.detail.intersection.object.el;

            if (el && el === ev.target) {
                const label = document.createElement('span');

                const container = document.createElement('div');
                container.setAttribute('id', 'place-label');

                label.innerText = name; // name of icon?
                container.appendChild(label);
                document.body.appendChild(container);

                setTimeout(() => {
                    container.parentElement.removeChild(container);
                }, 1500);
            }

        };

        icon.addEventListener('click', clickListener);
        sceneEl.appendChild(icon);
*/
    });
};



