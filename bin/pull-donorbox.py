# !/usr/bin/env python3

import requests
import json
import os
import time
import cmd

DONORBOX_EMAIL = os.environ.get('DONORBOX_EMAIL', None)
DONORBOX_API_KEY = os.environ.get('DONORBOX_API_KEY', None)
CAMPAIGN_ID = os.environ.get('CAMPAIGN_ID', None)

if not DONORBOX_API_KEY or not DONORBOX_EMAIL:
    print("Donorbox environment variables not configured, exiting.")
    print("Values are: DONORBOX_EMAIL: {}, DONORBOX_API_KEY: {}".format(DONORBOX_EMAIL, DONORBOX_API_KEY))
    exit(-1)

url = "https://{}:{}@donorbox.org/api/v1/campaigns".format(DONORBOX_EMAIL, DONORBOX_API_KEY)
headers = {'content-type': 'application/json'}
response = requests.get(url, headers=headers)
print(json.loads(response.text))
raw_data = json.loads(response.text)

# Get the right campaign
campaign = next(campaign for campaign in raw_data if campaign["id"] == 155698)
print(campaign)

FILENAME = 'donorbox.json'
OUTPUT_DIR = 'site/globals/data'

path = OUTPUT_DIR + '/' + FILENAME


# Trying to mimic the time format from the bash implementation
now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

def remove_file_if_it_exists(path):
    if os.path.isfile(path):
        os.unlink(path)


def save(data_to_save, path):
    remove_file_if_it_exists(path)
    with open(path, 'w+') as fp:
        json.dump(data_to_save, fp, ensure_ascii=False)


def main():
    records = campaign
    to_save = {"updated": now, "total": records["total_raised"], "data": records}
    target_path = os.path.join(OUTPUT_DIR, FILENAME)
    save(to_save, target_path)
    print("Creating donorbox datafile")


if __name__ == '__main__':
    main()
