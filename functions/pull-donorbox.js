/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  try {
    const response = await fetch("https://icanhazdadjoke.com", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
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