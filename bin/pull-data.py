# !/usr/bin/env python3
from airtable import Airtable
import json
import os
import time
import cmd
APP_ID = os.environ.get('APP_ID', None)
APP_KEY = os.environ.get('APP_KEY', None)
if not APP_ID or not APP_KEY:
    print("Airtable environment variables not configured, exiting.")
    print("Values are: APP_ID: {}, APP_KEY: {}".format(APP_ID, APP_KEY))
    exit(-1)
TABLE_TO_FILENAME = {
        'Hospitals': 'hospitals.json',
        'Donor pipeline': 'sponsors.json',
        'Team': 'team.json'
}

TABLE_VIEW = {
        'Hospitals': 'Receiving Orders',
        'Donor pipeline': 'Website data',
        'Team': 'On Website'
}

TABLE_FIELDS = {
        'Hospitals': ['Hospital Name', 'Number of orders', 'Total Meals'],
        'Donor pipeline': ['Which hospital?', 'Amount for Website'],
        'Team': ['Name', 'Link', 'Team', 'Bio', 'Picture']
}

OUTPUT_DIR = 'site/globals/data'

# Trying to mimic the time format from the bash implementation
now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

def get_records(table, view):
    airtable = Airtable(APP_ID, table, api_key=APP_KEY)
    for fields_table, fields in TABLE_FIELDS.items():
        if table == fields_table:
            print(fields)
            return airtable.get_all(view=view, fields=fields)

def remove_file_if_it_exists(path):
    print(path)

    if os.path.isfile(path):
        os.unlink(path)
def save(data_to_save, path):
    remove_file_if_it_exists(path)
    with open(path, 'w+') as fp:
        json.dump(data_to_save, fp, ensure_ascii=False)
def main():
    for table, destination in TABLE_TO_FILENAME.items():
        for view_table, view in TABLE_VIEW.items():
            if table == view_table:
                records = get_records(table, view)
                to_save = {"updated": now, "records": records}
                target_path = os.path.join(OUTPUT_DIR, destination)
                save(to_save, target_path)
                print("Creating " + table + " table using \"" + view + "\" view")

if __name__ == '__main__':
    main()
