#!/usr/bin/env python3
from pathlib import Path
import json
import requests


hospitals_folder = Path('site') / 'hospital'
if hospitals_folder.exists():
    for filename in hospitals_folder.iterdir():
        file_path = hospitals_folder /filename
        if file_path.is_file() and filename != 'readme.md':
            file_path.unlink()
else:
    hospitals_folder.mkdir()

with open("site/globals/data/hospitals.json") as hospitals_json:
    data = json.load(hospitals_json)

for record in data["records"]:
    id = record["id"]
    name = record["fields"]["Hospital Name"]

    front_matter = """---
    layout: hospital
    hospital_id: {id}
    tags: hospital
    name: {name}
    ---
    """.format(id=id, name=name)

    front_matter = "\n".join([s.strip() for s in front_matter.splitlines()])

    hospital_file = hospitals_folder / (name.replace(" ", "-") + ".md")
    with open(hospital_file, 'w') as f:
        f.write(front_matter)

    print("Creating hospital/" + id + " (" + name + ")")
