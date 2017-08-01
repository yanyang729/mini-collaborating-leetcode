#!/bin/bash

redis-server &
cd ./oj-server 
nodemon server.js &


cd ../executor 
# python3 executor_server.py &

sleep 5

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

kill -9 $(lsof -ti tcp:3000) 
# kill -9 $(lsof -ti tcp:5000)
kill -9 $(lsof -ti tcp:6379)
