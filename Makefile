#!/usr/bin/env bash

BOLD := \033[1m
DIM := \033[2m
RESET := \033[0m

pp:
	@echo "$(BOLD)Pulling data from airtable...$(RESET)"
	@python3 ./bin/pull-data.py
	@echo "Meals Data downloaded!"
	@echo "--------------------------------------------------------"
	@echo "$(BOLD)Creating hospitals...$(RESET)"
	@python3 ./bin/create-hospitals.py
	@echo "--------------------------------------------------------"
	@echo "meals are ready to roll"
	@echo "--------------------------------------------------------"

# For open information

build: pp
	@echo "$(BOLD)Building for production$(RESET)"
	npm run production

serve: pp
	@echo "$(BOLD)Watching...$(RESET)"
	npm run dev