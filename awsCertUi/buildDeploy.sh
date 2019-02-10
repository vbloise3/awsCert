#!/usr/bin/env bash
#/bin/bash

#build the chalice-javascript-jdk
#cd ~/awsCert/awsCertUi/src/chalice-javascript-sdk/
#rm -r *
#cd ~/awsCert/awsCertUi/src/
#rmdir chalice-javascript-sdk
#cd ~/awsCert/
#chalice generate-sdk ./awsCertUi/src

#build the site
cd ~/awsCert/awsCertUi/
#build the site
ng build --prod --aot
#upload files
aws s3 cp ./dist/awsCertUi s3://awscertification.com --recursive --acl public-read
#aws s3 cp ./dist/mbloiseResume3Ui s3://www.marinbloise.com --recursive --acl public-read
