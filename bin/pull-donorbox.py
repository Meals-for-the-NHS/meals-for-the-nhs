# !/usr/bin/env python3

import requests
import json
import os
import time
import cmd

DONORBOX_EMAIL = os.environ.get('DONORBOX_EMAIL', None)
DONORBOX_API_KEY = os.environ.get('DONORBOX_API_KEY', None)

if not DONORBOX_API_KEY or not DONORBOX_EMAIL:
    print("Donorbox environment variables not configured, exiting.")
    print("Values are: DONORBOX_EMAIL: {}, DONORBOX_API_KEY: {}".format(DONORBOX_EMAIL, DONORBOX_API_KEY))
    exit(-1)

url = "https://{}:{}@donorbox.org/api/v1/campaigns".format(DONORBOX_EMAIL, DONORBOX_API_KEY)
headers = {'content-type': 'application/json'}
response = requests.get(url, headers=headers)
print(response.text)

FILENAME = 'donorbox.json'
OUTPUT_DIR = 'data'

path = OUTPUT_DIR

print(path)
