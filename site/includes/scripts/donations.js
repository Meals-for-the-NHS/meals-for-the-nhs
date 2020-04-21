const donationTemplate = document.querySelector('#donation-template')
donationTemplate.style.display = 'none'

fetch('https://europe-west2-meals4nhs.cloudfunctions.net/api/commented-donations')
  .then(r => r.json())
  .then((data) => {
    const container = document.querySelector('.donations-container')
    data.donations.forEach((donation) => {
      const element = donationTemplate.cloneNode(true)
      for (const key in donation) {
        element.querySelector(`.${key}`).innerHTML = donation[key]
      }
      element.style.display = 'flex'
      container.appendChild(element)
    })
})