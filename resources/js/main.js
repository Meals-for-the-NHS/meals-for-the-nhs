
// Import local modules
import '@modules/mobile-nav'
import '@modules/lazyload'

const thousands = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

let realRaised = null, realDonors = null
let displayRaised = 0, displayDonors = 0
let raisedStep = 10000, donorsStep = 10
const intervalPeriod = 50
const movingTime = 2000
let interval = null

function updater() {
  interval = true

  displayRaised += raisedStep
  displayDonors += donorsStep

  displayRaised = Math.min(displayRaised, realRaised)
  displayDonors = Math.min(displayDonors, realDonors)

  document.querySelectorAll('div.progress-bar').forEach((div) => {
    div.querySelector('progress').setAttribute('value', displayRaised)
    const raised = div.querySelector('div.raised')
    raised.querySelector('.value').innerHTML = `£${thousands(displayRaised)}`
    raised.querySelector('.text').innerHTML = 'Raised'
    const donors = div.querySelector('div.donors')
    donors.querySelector('.value').innerHTML = thousands(displayDonors)
    donors.querySelector('.text').innerHTML = 'Donations'
  })

  if (!realRaised || displayRaised < realRaised) {
    setTimeout(updater, intervalPeriod)
  } else {
    interval = null
  }
}

updater()

firebase.initializeApp({
  apiKey: 'AIzaSyCpaVRwkw239CGAmcOJWIyzelWdA1SBkXo',
  databaseURL: 'https://meals4nhs.firebaseio.com',
  projectId: 'meals4nhs',
  appId: '1:820347843170:web:9c55207c4f680e275a173b'
})

const db = firebase.firestore()

db.collection('aggregates').doc('donations')
  .get()
  .then((docRef) => {
    const donations = docRef.data()
    const { donorbox, sponsors }  = docRef.data()
    realRaised = donorbox.amount + sponsors.amount
    realDonors = donorbox.donors + sponsors.donors

    const steps = movingTime / intervalPeriod
    raisedStep = (realRaised - displayRaised) / steps
    donorsStep = (realDonors - displayDonors) / steps

    if (!interval) {
      updater()
    }
  })
