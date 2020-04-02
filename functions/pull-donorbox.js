// https://functions-playground.netlify.com/

import fetch from "node-fetch";

const API_ENDPOINT = "https://donorbox.org/api/v1/campaigns/";

const { DONORBOX_EMAIL } = process.env;
const { DONORBOX_API_KEY } = process.env;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data.joke
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};


// (function() {
//     const email = '{{ helpers.env.DONORBOX_EMAIL }}'
//     const key = '{{ helpers.env.DONORBOX_API_KEY }}'
//     let headers = new Headers();
//     headers.append('Authorization', 'Basic ' + btoa(`${email}:${key}`))
//     url = `https://donorbox.org/api/v1/campaigns`
//     const thousands = (s) => s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split('.')[0]
//     if (document.querySelectorAll('.progress-bar')) {
//         fetch(url, { headers })
//         .then(r => r.json())
//         .then((json) => {
//             const [_, campaign] = json
//             let { total_raised, donations_count } = campaign
//             total_raised += {{ total_sponsorship }}
//             donations_count += {{ total_sponsors }}
//             var bars = document.querySelectorAll('.progress-bar')
//             for (i = 0; i < bars.length; i++) {
//                 bars[i].querySelector('.sponsorship').setAttribute('value', total_raised)
//                 bars[i].querySelector('p.raised').innerHTML = `£${thousands(total_raised)}`
//                 bars[i].querySelector('p.donors').innerHTML = thousands(donations_count)
//             }
//         })
//     }
//   })()