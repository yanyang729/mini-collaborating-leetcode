# mini-collaborating-leetcode

## About
This project is to build a web app that people can add their coding problems and edit the code on the same page just like google doc. 

## Progress
A web app with following functions already been added:
- UI components
- Problems CRUD.
- view problem detail.
- a RESTful API 
- communicate with mongoDB hosted on Mlab.
- Using ace edtor and socket.io, realize collaborative text editing, showing cursors and text changes.
- configure Redis, store session content and delete from memory. 

To-do:
- authorization: only logged users can add problems
- remove problems
- ...

## Deployment on AWS
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
