#!/usr/bin/env bash

BOLD := \033[1m
DIM := \033[2m
RESET := \033[0m

pp:
	@echo "$(BOLD)Testing 👋$(RESET)"

# For open information

test: pp

build: pp

serve: pp
