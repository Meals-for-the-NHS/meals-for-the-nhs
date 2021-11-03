#!/usr/bin/env bash

BOLD := \033[1m
DIM := \033[2m
RESET := \033[0m

build:
	@echo "$(BOLD)Building for production$(RESET)"
	npm run production

serve:
	@echo "$(BOLD)Watching...$(RESET)"
	npm run dev