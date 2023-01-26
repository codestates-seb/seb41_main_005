#!/usr/bin/env bash
cd /home/ubuntu/build
#sudo nohup java -jar server-0.0.1-SNAPSHOT.jar > logs.out 2>&1 & #로그있음
sudo nohup java -jar server-0.0.1-SNAPSHOT.jar > /dev/null 2> /dev/null < /dev/null & #로그없음