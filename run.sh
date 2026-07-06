#!/usr/bin/env bash
#
# run.sh — start or compile/build the StephenPortfolio site locally.
#
# Usage:
#   ./run.sh            # dev server with hot reload (default)
#   ./run.sh dev        # same as above
#   ./run.sh build      # compile/build the site (production bundle)
#   ./run.sh compile    # same as build
#   ./run.sh preview    # production build, then serve the built site
#
# The site opens at the URL printed by Vite (dev defaults to http://localhost:5173).
# Press Ctrl+C to stop the server.

set -euo pipefail

# Always run from the directory this script lives in.
cd "$(dirname "$0")"

MODE="${1:-dev}"

# Pick a package manager: prefer bun (this project uses bun.lock), fall back to npm.
if command -v bun >/dev/null 2>&1; then
  RUN="bun run"
  INSTALL="bun install"
elif command -v npm >/dev/null 2>&1; then
  RUN="npm run"
  INSTALL="npm install"
else
  echo "Error: neither bun nor npm found on PATH. Install one to run this app." >&2
  exit 1
fi

# Install dependencies on first run (or after they change).
if [ ! -d node_modules ]; then
  echo "Installing dependencies ($INSTALL)..."
  $INSTALL
fi

case "$MODE" in
  dev)
    echo "Starting dev server (hot reload)..."
    exec $RUN dev
    ;;
  build|compile)
    echo "Compiling/building the site..."
    exec $RUN build
    ;;
  preview)
    echo "Building production bundle..."
    $RUN build
    echo "Serving production build..."
    exec $RUN preview
    ;;
  *)
    echo "Unknown mode: $MODE" >&2
    echo "Usage: ./run.sh [dev|build|compile|preview]" >&2
    exit 1
    ;;
esac
