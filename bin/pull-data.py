#!/usr/bin/env python3
from airtable import Airtable
from pathlib import Path
from os import environ
import json
import time
import requests

APP_ID = environ.get('APP_ID', None)
APP_KEY = environ.get('APP_KEY', None)

if not APP_ID or not APP_KEY:
    print("Airtable environment variables not configured, exiting.")
    print("Values are: APP_ID: {}, APP_KEY: {}".format(APP_ID, APP_KEY))
    exit(-1)

tables = {
    'Hospitals': {
        'filename': 'hospitals.json',
        'view': 'Website data',
        'fields': [
            'Hospital Name', 'Number of orders', 'Total Meals'
        ]
    },
    'Donor pipeline': {
        'filename': 'sponsors.json',
        'view': 'Website data',
        'fields': [
            'Which hospital?', 'Amount for Website'
        ]
    },
    'Team': {
        'filename': 'team.json',
        'view': 'Website data',
        'fields': [
            'Name', 'Link', 'Team', 'Bio', 'Picture'
        ]
    },
    'Fundraising': {
        'filename': 'fundraising.json',
        'view': 'Website data',
        'fields': [
            'Name', 'Description', 'Goal amount', 'Website', 'Image (uses first)', 'Start date', 'End date'
        ]
    },
    'Donors': {
        'filename': 'donors.json',
        'view': 'Website data',
        'fields': [
            'First Name', 'Amount', 'Donor Comment', 'Donated At'
        ]
    }
}

output_dir = Path('site/globals/data')

def pull_airtable():
    # Trying to mimic the time format from the bash implementation
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    for table, options in tables.items():
        airtable = Airtable(APP_ID, table, api_key=APP_KEY)
        records = airtable.get_all(view=options['view'], fields=options['fields'])
        to_save = {
            'updated': now,
            'records': records
        }

        with open(output_dir / options['filename'], 'w') as f:
            json.dump(to_save, f, ensure_ascii=False)

        print(f'Saved {table} table using {options["view"]} view')


def pull_dashboard():
    res = requests.get('https://europe-west2-meals4nhs.cloudfunctions.net/api/summary')
    if res.status_code == 200:
        with open(output_dir / 'summary.json', 'w') as f:
            f.write(res.text)

if __name__ == '__main__':
    pull_airtable()
    pull_dashboard()
