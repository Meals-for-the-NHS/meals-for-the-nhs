
let mapResolver = null
let hospitals = null
let providers = null

const mapPromise = new Promise((resolve, reject) => {
  mapResolver = resolve
})

// called by Google
function initMap() {
  mapResolver()
}

const hospitalsPromise = new Promise((resolve, reject) => {
  fetch('https://europe-west2-meals4nhs.cloudfunctions.net/api/receiving-hospitals')
    .then(r => r.json())
    .then((data) => {
      hospitals = data.hospitals
      resolve()
    })
})

const providersPromise = new Promise((resolve, reject) => {
  fetch('/assets/providers.json')
    .then(r => r.json())
    .then((data) => {
      providers = data
      resolve()
    })
})

Promise.all([mapPromise, hospitalsPromise, providersPromise])
  .then(() => {
    const map = new google.maps.Map(document.querySelector('.map'), {
      center: {
        lat: 54.021722, lng: -2.129872
      },
      zoom: 6,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#3182CE"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    });
    const icons = {
      hospital: {
        icon: {
          url: 'data:image/svg+xml,%3C%3Fxml version="1.0" encoding="UTF-8" standalone="no"%3F%3E%3C!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"%3E%3Csvg width="20px" height="25px" viewBox="0 0 20 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"%3E%3Cg id="Page-1"%3E%3Cg id="map-pin"%3E%3Cpath id="pin" d="M17.545,16.563C19.074,14.807 20,12.512 20,10C20,4.477 15.523,0 10,0C4.477,0 0,4.477 0,10C0,12.992 1.314,15.677 3.396,17.51L9.967,24.531L17.578,16.563L17.545,16.563Z" style="fill:rgb(174,37,115);"/%3E%3Cg transform="matrix(0.0196721,0,0,0.0197337,4.96395,5.29728)"%3E%3Cpath d="M468.509,137.107L374.893,137.107L374.893,43.491C374.893,19.51 355.383,0 331.403,0L180.598,0C156.617,0 137.107,19.51 137.107,43.491L137.107,137.107L43.491,137.107C19.51,137.107 0,156.617 0,180.598L0,331.402C0,355.383 19.51,374.893 43.491,374.893L137.107,374.893L137.107,468.509C137.107,492.49 156.617,512 180.598,512L331.402,512C355.383,512 374.893,492.49 374.893,468.509L374.893,374.893L468.509,374.893C492.49,374.893 512,355.383 512,331.402L512,180.598C512,156.617 492.49,137.107 468.509,137.107ZM353.148,331.401C341.139,331.401 331.403,341.137 331.403,353.146L331.431,468.506C331.431,468.506 331.422,468.507 331.403,468.507L180.598,468.507L180.598,353.146C180.598,341.137 170.862,331.401 158.853,331.401L43.491,331.401L43.491,180.598L158.853,180.598C170.862,180.598 180.598,170.862 180.598,158.853L180.598,43.491L331.402,43.491L331.402,158.853C331.402,170.862 341.138,180.598 353.147,180.598L468.509,180.598L468.509,331.402L353.148,331.402L353.148,331.401Z" style="fill:white;fill-rule:nonzero;"/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A',
          anchor: new google.maps.Point(20, 20)
        }
      },
      provider: {
        icon: {
          url: 'data:image/svg+xml,%0A%3Csvg width="20px" height="25px" viewBox="0 0 20 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"%3E%3Cg id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"%3E%3Cg id="map-pin"%3E%3Cpath d="M17.545,16.5632 C19.0741,14.8069 20,12.51155 20,10 C20,4.477155 15.52285,0 10,0 C4.477155,0 0,4.477155 0,10 C0,12.99195 1.313985,15.67705 3.39637,17.50965 L9.9673,24.53125 L17.5781,16.5625 L17.545,16.5632 Z" id="pin" fill="%232A4365"%3E%3C/path%3E%3Cpath d="M4.213895,12.37505 C4.213895,11.9751 4.537245,11.65155 4.936455,11.65155 L9.02,11.65155 C9.19125,11.65155 9.3301,11.51275 9.3301,11.3415 C9.3301,11.17025 9.19125,11.0314 9.02,11.0314 L4.936455,11.0314 C4.19401,11.0314 3.59375,11.63335 3.59375,12.37505 L3.59375,12.8041 C3.59375,13.5462 4.195325,14.14775 4.937395,14.14775 L14.90635,14.14775 C15.64845,14.14775 16.25,13.5462 16.25,12.8041 L16.25,12.37505 C16.25,11.633 15.64845,11.0314 14.90635,11.0314 L11.914,11.0314 C11.7428,11.0314 11.60395,11.17025 11.60395,11.3415 C11.60395,11.51275 11.7428,11.65155 11.914,11.65155 L14.90635,11.65155 C15.30595,11.65155 15.62985,11.97545 15.62985,12.37505 L15.62985,12.8041 C15.62985,13.2037 15.30595,13.5276 14.90635,13.5276 L4.937395,13.5276 C4.53782,13.5276 4.213895,13.2037 4.213895,12.8041 L4.213895,12.37505 Z M10.0758,3.75 C13.1066,3.75 14.67915,4.964275 15.47325,6.29645 C16.25,7.59945 16.25,8.96275 16.25,9.2336 C16.25,9.52565 16.1931,9.80985 16.03225,10.0289 C15.8601,10.2634 15.6002,10.38085 15.2949,10.38085 L15.2949,10.38085 L11.37205,10.38085 L10.7352,12.34305 C10.6917,12.477 10.56335,12.56485 10.42275,12.5569 C10.2821,12.54895 10.1645,12.4472 10.1364,12.3092 L10.1364,12.3092 L9.51475,9.2557 L9.2216,10.16585 C9.18035,10.294 9.0611,10.38085 8.9265,10.38085 L8.9265,10.38085 L4.749265,10.38085 C4.557425,10.39195 4.27986,10.35105 4.03931,10.18255 C3.775935,9.9981 3.59375,9.6859 3.59375,9.23515 C3.59375,8.77575 3.617945,7.40295 4.45544,6.1408 C5.30815,4.855755 6.9587,3.75 10.0758,3.75 Z M10.0758,4.370145 C7.12355,4.370145 5.6881,5.4048 4.97217,6.4837 C4.241015,7.58555 4.213895,8.8003 4.213895,9.23515 C4.213895,9.49985 4.31026,9.6152 4.39506,9.6746 C4.49767,9.74645 4.631345,9.76755 4.717755,9.7615 C4.72498,9.761 4.73222,9.7607 4.73946,9.7607 L8.7006,9.7607 L9.2873,7.93895 C9.3305,7.80475 9.45885,7.7166 9.5996,7.7244 C9.74035,7.7322 9.85815,7.834 9.8863,7.97215 L9.8863,7.97215 L10.50905,11.03095 L10.85175,9.97505 C10.89325,9.84725 11.0123,9.7607 11.1467,9.7607 L11.1467,9.7607 L15.2949,9.7607 C15.4294,9.7607 15.49195,9.71695 15.5324,9.6619 C15.58415,9.5914 15.62985,9.4578 15.62985,9.23515 C15.62985,8.98925 15.62835,7.7677 14.9406,6.61395 C14.26865,5.48685 12.90915,4.370145 10.0758,4.370145 Z" id="burger" fill="%23FFFFFF"%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
          anchor: new google.maps.Point(20, 20)
        }
      }
    };
    hospitals.forEach((hospital) => {
      const marker = new google.maps.Marker({
        map: map,
        position: hospital.coordinates,
        icon: icons.hospital.icon,
        title: hospital['Hospital Name']
      });
    });
    providers.forEach((provider) => {
      const marker = new google.maps.Marker({
        map: map,
        position: provider.coordinates,
        icon: icons.provider.icon,
        title: provider.name
      });
    });
  });
