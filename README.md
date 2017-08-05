# mini-collaborating-leetcode

## About
This project is to build a web app that people can add their coding problems and edit the code on the same page just like google doc. 

[Click here to see the demo](http://35.161.214.242:3000/problems). You can share the problem url with others so that everyone who has the link can editor on the same page.

## Progress
A web app with following functions already been added:
- UI components
- Add Problems
- view problem detail.
- create a RESTful API
- communicate with mongoDB hosted on Mlab.
- Use ace editor and socket.io, realize collaborative text editing, show cursors and text changes.
- configure Redis, store session content and delete from memory. 
- build python Docker container
- add code execution for API, served with flask, 

To-do:
- authorization: only logged users can add problems
- remove problems
- ...


## Deployment on AWS
nodejs web app server:
```bash
sudo apt-get update
sudo apt-get install git-all
git clone https://github.com/yanyang729/mini-collaborating-leetcode.git
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g nodemon
wget http://download.redis.io/releases/redis-3.2.6.tar.gz
tar xzf redis-3.2.6.tar.gz
cd redis-3.2.6
sudo apt-get make
# install deps for redis
cd deps
make hiredis lua jemalloc linenoise geohash-int
sudo make install
cd utils
sudo ./install_server.sh



```

flask code excutor server:
```bash
# setups
wget http://repo.continuum.io/archive/Anaconda3-4.0.0-Linux-x86_64.sh
bash Anaconda3-4.0.0-Linux-x86_64.sh
export PATH=~/anaconda3/bin:$PATH
conda create name oj-executor python=3
sudo apt-get install git-all
git clone https://github.com/yanyang729/mini-collaborating-leetcode.git
source activate oj-executor
cd oj-excutor/
pip install -r requirements.txt 

# add docker groups: https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo
sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker
python executor_server.py 5000
```


Trouble shotting:
- you need to tell the Flask Dev webserver to run on 0.0.0.0 instead of localhost
- redis need dependencie
- share links to friends to invite coding together
