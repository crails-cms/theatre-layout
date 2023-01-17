#!/bin/sh

crails templates build \
  -r html \
  -i views \
  -t Crails::HtmlTemplate \
  -z crails/html_template.hpp \
  -n TheatreLayoutHtmlRenderer \
  -p \.html$ \
  -v

mkdir -p build/sass

node-sass --output-style compressed "stylesheets/layout.scss" > build/sass/layout.css
node-sass --output-style compressed "stylesheets/admin.scss"  > build/sass/admin.css

crails-builtin-assets \
  --inputs "javascripts" "build/sass" "stylesheets/fonts" \
  --output "lib/assets" \
  --classname "TheatreLayoutAssets" \
  --compression "gzip" \
  --uri-root "/cms/plugins/theatre-layout/assets/"
