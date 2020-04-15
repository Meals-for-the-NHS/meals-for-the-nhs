let mapResolver = null
let hospitals = null

const mapPromise = new Promise((resolve, reject) => {
  mapResolver = resolve
})

// called by Google
function initMap() {
  mapResolver()
}

const dataPromise = new Promise((resolve, reject) => {
  fetch('https://europe-west2-meals4nhs.cloudfunctions.net/api/receiving-hospitals')
    .then(r => r.json())
    .then((data) => {
      hospitals = data.hospitals
      resolve()
    })
})

Promise.all([mapPromise, dataPromise])
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
    })
    const icons = {
      hospital: {
        icon: {
          url: 'data:image/svg+xml;utf-8,<svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M35.09 33.1264C38.1482 29.6138 40 25.0231 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 25.9839 2.62797 31.3541 6.79274 35.0193L19.9346 49.0625L35.1562 33.125L35.09 33.1264ZM8.42779 18.4703C8.42779 17.6006 8.48203 15.1711 9.94434 12.9674C11.3762 10.8096 14.2471 8.74029 20.1516 8.74029C25.8183 8.74029 28.5373 10.9737 29.8812 13.2279C31.2567 15.5354 31.2597 17.9785 31.2597 18.4703C31.2597 18.9156 31.1683 19.1828 31.0648 19.3238C30.9839 19.4339 30.8588 19.5214 30.5898 19.5214H22.2934C22.0246 19.5214 21.7865 19.6945 21.7035 19.9501L21.0181 22.0619L19.7726 15.9443C19.7163 15.668 19.4807 15.4644 19.1992 15.4488C18.9177 15.4332 18.661 15.6095 18.5746 15.8779L17.4012 19.5214H9.47892C9.46444 19.5214 9.44996 19.522 9.43551 19.523C9.26269 19.5351 8.99534 19.4929 8.79012 19.3492C8.62052 19.2304 8.42779 18.9997 8.42779 18.4703ZM20.1516 7.5C13.9174 7.5 10.6163 9.71151 8.91088 12.2816C7.23589 14.8059 7.1875 17.5515 7.1875 18.4703C7.1875 19.3718 7.55187 19.9962 8.07862 20.3651C8.55972 20.7021 9.11485 20.7839 9.49853 20.7617H17.853C18.1222 20.7617 18.3607 20.588 18.4432 20.3317L19.0295 18.5114L20.2728 24.6184C20.329 24.8944 20.5642 25.0979 20.8455 25.1138C21.1267 25.1297 21.3834 24.954 21.4704 24.6861L22.7441 20.7617H30.5898C31.2004 20.7617 31.7202 20.5268 32.0645 20.0578C32.3862 19.6197 32.5 19.0513 32.5 18.4703V18.4672C32.5 17.9255 32.5 15.1989 30.9465 12.5929C29.3583 9.92855 26.2132 7.5 20.1516 7.5ZM8.42779 24.7501C8.42779 23.9502 9.07449 23.3031 9.87291 23.3031H18.04C18.3825 23.3031 18.6602 23.0255 18.6602 22.683C18.6602 22.3405 18.3825 22.0628 18.04 22.0628H9.87291C8.38802 22.0628 7.1875 23.2667 7.1875 24.7501V25.6082C7.1875 27.0924 8.39065 28.2955 9.87479 28.2955H29.8127C31.2969 28.2955 32.5 27.0924 32.5 25.6082V24.7501C32.5 23.266 31.2969 22.0628 29.8127 22.0628H23.828C23.4856 22.0628 23.2079 22.3405 23.2079 22.683C23.2079 23.0255 23.4856 23.3031 23.828 23.3031H29.8127C30.6119 23.3031 31.2597 23.9509 31.2597 24.7501V25.6082C31.2597 26.4074 30.6119 27.0552 29.8127 27.0552H9.87479C9.07564 27.0552 8.42779 26.4074 8.42779 25.6082V24.7501Z" fill="rgb(42,67,101)"/></svg>',
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
      })
    })
  })
