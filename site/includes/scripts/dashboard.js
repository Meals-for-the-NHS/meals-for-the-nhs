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
      zoom: 6
    })
    hospitals.forEach((hospital) => {
      const marker = new google.maps.Marker({
        map: map,
        position: hospital.coordinates,
        title: hospital['Hospital Name']
      })
    })
  })
