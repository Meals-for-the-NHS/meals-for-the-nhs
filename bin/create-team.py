#!/usr/bin/env python3
from pathlib import Path
import json
import requests

with open("site/globals/data/team.json") as teams_json:
    data = json.load(teams_json)

for record in data["records"]:
    name = record["fields"]["Name"]
    image = record["fields"]["Picture"][0]["thumbnails"]["full"]["url"]
    image_url = (name.replace(" ", "-") + '.png').lower()
    filepath = Path('images') / 'team' / image_url.lower()

    if not filepath.exists():
        r = requests.get(image, allow_redirects=True)
        with open(filepath, 'wb') as f:
            f.write(r.content)
        print("Saving image/" + image_url)
    else :
        print(f'already have {filepath}')
