# Meals for the NHS

[mealsforthenhs.com](https://www.mealsforthenhs.com)

Requires Python

To set up:
`npm install`

To pull down from Airtable and run locally:
`export APP_ID=appid && export APP_KEY=appkey` (replace with your Airtable app ID and Key)
`pip3 install -r requirements.txt`
`make serve`

To run locally without fresh Airtable data:
`npm run dev`

To build a production version locally
`make build`

Builds to `dist`. Check `netlify.toml` for Netlify settings.