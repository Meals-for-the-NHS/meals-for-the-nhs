
// Import local modules
// import '@modules/mobile-nav'
import '@modules/lazyload'

const thousands = s => s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split('.')[0]

function grabDonorboxAmounts() {
  try {
    fetch('/api/pull-donorbox')
      .then(r => r.json())
      .then((json) => {
        const { donorboxRaised, donorboxCount } = json

        document.querySelectorAll('div.progress-bar').forEach((div) => {
          const raised = div.querySelector('p.raised')
          const totalAmount = parseFloat(raised.dataset.amount) + donorboxRaised
          const donors = div.querySelector('p.donors')
          const totalDonors = parseFloat(donors.dataset.amount) + donorboxCount

          div.querySelector('progress').setAttribute('value', totalAmount)
          raised.innerHTML = `£${thousands(totalAmount)}`
          donors.innerHTML = thousands(totalDonors)
        })

        setTimeout(grabDonorboxAmounts, 10000)
      })
  } catch (_) {
    // if the fetch failed, for any reason don't worry about it, just try again later
    setTimeout(grabDonorboxAmounts, 10000)
  }
}

grabDonorboxAmounts()
