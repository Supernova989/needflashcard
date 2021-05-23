#!/bin/bash

CONTENT=$(cat <<EOF
####

REACT_APP_HOST_API=localhost:7000
MG_DOMAIN=mg.mydomain.com
MG_API_KEY=
MG_API_BASE=https://api.eu.mailgun.net/v3
REACT_APP_USE_RECAPTCHA=true
REACT_APP_GOOGLE_RECAPTCHA_SITEKEY=
RECAPTCHA_SECRET_KEY=

####
EOF
)

DIR="./env/"
ENV_PROD="$DIR.env.prod"
ENV_DEV="$DIR.env.dev"

if [ -d "$DIR" ] && [ ! -L "$DIR" ] ; then
   echo "Folder \"env\" already exists. To run the script, you should remove it."
else
   echo "Creating Env folder..."
   mkdir $DIR
   echo "Writing Env files..."
   echo -e "${CONTENT}" >> $ENV_PROD
   echo -e "${CONTENT}" >> $ENV_DEV
fi
