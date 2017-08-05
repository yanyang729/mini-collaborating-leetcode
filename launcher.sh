#!/bin/bash
fuser -k 3000/tcp
fuser -k 3001/tcp
fuser -k 3002/tcp
fuser -k 5000/tcp
fuser -k 5001/tcp
fuser -k 5002/tcp

service redis_6379 start
cd ./oj-server
#npm install
nodemon server.js 3000 &
nodemon server.js 3001 &
nodemon server.js 3002 &
#cd ../oj-client
#npm install

#ng build --watch &
cd ../executor
#pip3 install -r requirements.txt
python3 executor_server.py 5000 &
python3 executor_server.py 5001 &
python3 executor_server.py 5002 &

sleep 5

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
fuser -k 3001/tcp
fuser -k 3002/tcp
fuser -k 5000/tcp
fuser -k 5001/tcp
fuser -k 5002/tcp

service redis_6379 stop
