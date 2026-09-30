#!/usr/bin/env sh
# Rebuilds src/assets/fonts from the fontsource packages. Geist and Geist Mono already ship a
# Latin-only variable file (covers Portuguese), so they are copied as they are:
#   geist.woff2       wght 100..900, registered as 300..800
#   geist-mono.woff2  wght 100..900, registered as 400..600
set -eu

SRC=node_modules/@fontsource-variable
OUT=src/assets/fonts

cp "$SRC/geist/files/geist-latin-wght-normal.woff2" "$OUT/geist.woff2"
cp "$SRC/geist-mono/files/geist-mono-latin-wght-normal.woff2" "$OUT/geist-mono.woff2"

ls -l "$OUT"
