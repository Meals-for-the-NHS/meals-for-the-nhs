#!/usr/bin/env python3

import json, os
import requests

hospitals_folder = 'site/hospital/'

for filename in os.listdir(hospitals_folder):
    file_path = os.path.join(hospitals_folder, filename)
    if os.path.isfile(file_path) and filename != 'readme.md':
        os.unlink(file_path)

with open("data/hospitals.json") as hospitals_json:
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

    hospital_file = open(hospitals_folder + name.replace(" ", "-") + ".md", "w+")
    hospital_file.write(front_matter)
    hospital_file.close()
    print("Creating hospital/" + id + " (" + name + ")")