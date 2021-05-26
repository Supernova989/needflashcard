#!/bin/bash

if [ -d "./docker" ] ; then
  echo "Docker folder found."
else
  echo "Creating folder \"docker\"..."
  mkdir -p ./docker/logs/traefik
  mkdir -p ./docker/mongo
fi

CONTENT=$(cat <<EOF
HOST_UI=
HOST_API=
HOST_TRAEFIK=

#### Mailgun
MG_DOMAIN=mg.mydomain.com
MG_API_KEY=
MG_API_BASE=https://api.eu.mailgun.net/v3

#### LetsEncrypt
LE_EMAIL=

#### Captcha
USE_CAPTCHA=true
CAPTCHA_PUBLIC_KEY=
CAPTCHA_SECRET_KEY=

EOF
)

####### Create .env file if not exists
ENV_FILE=".env"
if [ -f "$ENV_FILE" ] ; then
   echo "ENV file already exists. To run the script, you should remove it."
else
   echo "Writing Env files..."
   echo -e "${CONTENT}" >> $ENV_FILE
fi

####### Create acme.json for Traefik
ACME_JSON="./traefik/acme.json"
if [ -f "$ACME_JSON" ] ; then
   echo "acme.json found."
else
   echo "Writing empty acme.json..."
   touch "$ACME_JSON"
fi
