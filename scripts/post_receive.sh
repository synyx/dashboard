#!/bin/bash
source "$HOME/.bash_profile"

cd ~/dashboard-frontend/

echo -e "running npm install……\n"
/usr/local/node/node-default/bin/npm install
if [ $? -eq 0 ];then
  echo -e "SUCCESSFUL\n"
else
  echo -e "FAIL\n"
fi

echo -e "running grunt…\n"
node_modules/grunt-cli/bin/grunt
if [ $? -eq 0 ];then
  echo -e "SUCCESSFUL\n"
else
  echo -e "FAIL\n"
fi