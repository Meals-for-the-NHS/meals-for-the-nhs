/* eslint-disable */
const fetch = require("node-fetch")

exports.handler = async function(event, context) {
  try {
    const email = process.env.DONORBOX_EMAIL
    const key = process.env.DONORBOX_API_KEY
    let headers = new fetch.Headers();
    const btoa = s => Buffer.from(s.toString(), 'binary').toString('base64')
    headers.append('Authorization', 'Basic ' + btoa(`${email}:${key}`))
    const url = `https://donorbox.org/api/v1/campaigns`
    const response = await fetch(url, { headers })
    const json = await response.json()
    const [_, campaign] = json
    let { total_raised, donations_count } = campaign
    return {
      statusCode: 200,
      body: JSON.stringify({
        donorboxRaised: Math.round(parseFloat(total_raised)),
        donorboxCount: donations_count
      })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: JSON.stringify(err.message) })
    }
  }
}
