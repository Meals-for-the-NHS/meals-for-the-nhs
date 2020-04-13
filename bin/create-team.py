#!/usr/bin/env python3

import json, os
import requests

with open("site/globals/data/team.json") as teams_json:
    data = json.load(teams_json)

for record in data["records"]:
    name = record["fields"]["Name"]
    image = record["fields"]["Picture"][0]["thumbnails"]["full"]["url"]
    image_url = (name.replace(" ", "-") + '.png').lower()

    r = requests.get(image, allow_redirects=True)
    open("images/team/" + image_url.lower(), 'wb').write(r.content)
    print("Saving image/" + image_url)
