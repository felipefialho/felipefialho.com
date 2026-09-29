#!/usr/bin/env sh
# Rebuilds src/assets/fonts from the fontsource packages: pins variable axes to the ranges
# the site uses and subsets to Latin (covers Portuguese). Requires: pip install fonttools brotli
set -eu

SRC=node_modules/@fontsource-variable
OUT=src/assets/fonts
TMP=$(mktemp -d)
UNICODES="U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201D,U+2022,U+2026,U+20AC,U+2192,U+00B7"
FEATURES="kern,liga,calt,ccmp,locl,mark,mkmk"

subset() {
  fonttools varLib.instancer "$1" $2 -q -o "$TMP/font.ttf"
  pyftsubset "$TMP/font.ttf" --unicodes="$UNICODES" --layout-features="$FEATURES" --flavor=woff2 --output-file="$OUT/$3"
}

subset "$SRC/mona-sans/files/mona-sans-latin-wdth-normal.woff2" "wdth=100:125 wght=400:800" mona-sans.woff2

rm -rf "$TMP"
ls -l "$OUT"
