
// Import local modules
// import '@modules/mobile-nav'
import '@modules/lazyload'

const thousands = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

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
  apiKey: "AIzaSyA0-F3QhkHLJNGnObhZESERdH_p0F58WBo",
  authDomain: "sap-meals-nhs.firebaseapp.com",
  databaseURL: "https://sap-meals-nhs.firebaseio.com",
  projectId: "sap-meals-nhs",
  storageBucket: "sap-meals-nhs.appspot.com",
  messagingSenderId: "61596947586",
  appId: "1:61596947586:web:ad656c22b3c1ab1284909b",
  measurementId: "G-CFDDZRSMVN"
})

const db = firebase.firestore()

db.collection('main').doc('all')
  .onSnapshot((doc) => {
    const { amount, donors } = doc.data()
    realRaised = amount
    realDonors = donors
    const steps = movingTime / intervalPeriod
    raisedStep = (realRaised - displayRaised) / steps
    donorsStep = (realDonors - displayDonors) / steps
    
    if (!interval) {
      updater()
    }
  })

