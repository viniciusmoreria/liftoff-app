#!/usr/bin/env bash

echo $GOOGLE_SERVICES_ANDROID | base64 --decode > ./src/libs/firebase/google-services.json
echo $GOOGLE_SERVICES_IOS | base64 --decode > ./src/libs/firebase/GoogleService-Info.plist