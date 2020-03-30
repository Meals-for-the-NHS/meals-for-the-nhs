# Meals for the NHS

[mealsforthenhs.com](https://www.mealsforthenhs.com)

A static site built with [Eleventy](https://www.11ty.dev/) and [TailwindCSS](https://tailwindcss.com) with additional support for pulling data from [Airtable](https://airtable.com/) via a Makefile.

Requires Python

To set up:
`npm install`

To pull down from Airtable and run locally:
Create an airtable base with an `Orders` and `Hospitals` table. The Hospitals table must have `Hospital Name` as one of the fields. (Change this in [bin/create-hospitals.py](bin/create-hospitals.py))
`export APP_ID=appid && export APP_KEY=appkey` (replace with your Airtable app ID and base Key – find those in your Airtable API docs)
`pip3 install -r requirements.txt`
`make serve`

To run locally without fresh Airtable data:
`npm run dev`

To build a production version locally
`make build`

### Hosting with Netlify

A Netlify file is included for one click install.
Builds to `dist`. Check `netlify.toml` for Netlify settings.

### More help

This site is based on the core of Skeleventy, a skeleton boilerplate built with Eleventy and TailwindCSS. Check out [Skeleventy](https://skeleventy.netlify.com/) for more help with the theme specifically, or [Eleventy](https://www.11ty.dev/) and [TailwindCSS](https://tailwindcss.com) for help with the static site builder and css respectively.