#!/usr/bin/env python3
from airtable import Airtable
from pathlib import Path
from os import environ
import json
import time
import cmd

APP_ID = environ.get('APP_ID', None)
APP_KEY = environ.get('APP_KEY', None)

if not APP_ID or not APP_KEY:
    print("Airtable environment variables not configured, exiting.")
    print("Values are: APP_ID: {}, APP_KEY: {}".format(APP_ID, APP_KEY))
    exit(-1)

tables = {
    'Hospitals': {
        'filename': 'hospitals.json',
        'view': 'Receiving Orders',
        'fields': [
            'Hospital Name', 'Number of orders', 'Total Meals'
        ]
    },
    'Sponsor a Hospital': {
        'filename': 'sponsors.json',
        'view': 'Website data',
        'fields': [
            'Which hospital?', 'Amount for Website'
        ]
    },
    'Team': {
        'filename': 'team.json',
        'view': 'On Website',
        'fields': [
            'Name', 'Link', 'Team', 'Bio', 'Picture',
        ]
    }
}

def main():
    # Trying to mimic the time format from the bash implementation
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    output_dir = Path('site/globals/data')

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

if __name__ == '__main__':
    main()
