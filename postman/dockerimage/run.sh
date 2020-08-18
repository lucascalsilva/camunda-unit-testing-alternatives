#!/bin/sh
cd /camunda
nohup ./camunda.sh &
cd /camunda-newman-app
node index.js