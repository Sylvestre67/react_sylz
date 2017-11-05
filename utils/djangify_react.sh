#!/bin/bash
# This script is run after react built the production environement.
# It copies all assets to static and templates in order for django to serve them correctly.

rsync build/*.html templates/
rsync -r build/static/ static

echo "Assets synchronized"
