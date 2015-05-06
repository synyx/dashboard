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
/usr/local/node/node-default/bin/grunt
if [ $? -eq 0 ];then
  echo -e "SUCCESSFUL\n"
else
  echo -e "FAIL\n"
fi 

echo -e "generate shizzl content\n"

# Load RVM into a shell session *as a function*
if [[ -s "$HOME/.rvm/scripts/rvm" ]] ; then

  # First try to load from a user install
  source "$HOME/.rvm/scripts/rvm"

elif [[ -s "/usr/local/rvm/scripts/rvm" ]] ; then

  # Then try to load from a root install
  source "/usr/local/rvm/scripts/rvm"

else

  printf "ERROR: An RVM installation was not found.\n"

fi

rvm use ruby-1.8.7-p371 

bundle exec rake deploy:post_receive

#source ~/perl5/perlbrew/etc/bashrc
perlbrew switch perl-5.14.2

# scripts
perl ~/dashboard/scripts/beertime.pl > ~/public_html/content/generated/bier.json
#~/dashboard/scripts/essenspranger.sh > ~/public_html/content/generated/essen.json
#perl ~/dashboard/scripts/code_violations.pl > ~/public_html/content/generated/sonar_violations.json
~/groovy-2.0.0/bin/groovy ~/dashboard/groovy/BuildStatus/BuildStatus.groovy
#~/dashboard/scripts/wikipedia.pl http://feeds.feedburner.com/wikimedia/wp-adt >~/public_html/content/generated/wikipedia.json
#~/dashboard/scripts/wetter.pl > ~/public_html/content/generated/weather.json
~/dashboard/scripts/fetch_all.sh

bundle exec rake deploy:listing
