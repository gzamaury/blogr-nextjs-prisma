#!/bin/bash

# pnpm Setup
echo "Setting up pnpm..."
pnpm setup

# Source .bashrc to load any new configurations
source /home/node/.bashrc

# Ensure PNPM_HOME is in the PATH
export PNPM_HOME="/home/node/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# Confirm pnpm setup
pnpm -v
pnpm install

# Vercel CLI install
pnpm add -g vercel@latest

