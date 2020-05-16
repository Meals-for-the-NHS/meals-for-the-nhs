#!/usr/bin/env python3
from pathlib import Path
import json
import requests

with open("site/globals/data/fundraising.json") as campaigns_json:
    data = json.load(campaigns_json)

for record in data["records"]:
    name = record["fields"]["Name"]
    image = record["fields"]["Image (uses first)"][0]["thumbnails"]["large"]["url"]
    image_url = (name.strip().replace(" ", "-") + '.png').lower()
    filepath = Path('images') / 'campaigns' / image_url.lower()

    if not filepath.exists():
        r = requests.get(image, allow_redirects=True)
        with open(filepath, 'wb') as f:
            f.write(r.content)
        print("Saving image/" + image_url)
    else :
        print(f'already have {filepath}')
