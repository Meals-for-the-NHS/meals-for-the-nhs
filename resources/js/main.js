
// Import local modules
// import '@modules/mobile-nav'
import '@modules/lazyload'

const thousands = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

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
    console.log(amount, donors, thousands(donors))
    document.querySelectorAll('div.progress-bar').forEach((div) => {
      div.querySelector('progress').setAttribute('value', amount)
      div.querySelector('p.raised').innerHTML = `£${thousands(amount)}`
      div.querySelector('p.donors').innerHTML = thousands(donors)
    })
  })
