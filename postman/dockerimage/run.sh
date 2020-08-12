#!/bin/sh
cd /camunda
nohup ./camunda.sh &
sleep 10;
while ! nc -z localhost 8080;
do
	echo Waiting for connection;
	sleep 5;
done;
echo Connected!;
cd /etc/newman
newman run ./payment-process.postman_collection.json \
-e ./payment-process.postman_environment.json \
-r html,cli \
--reporter-html-export reports/process-test-report.html \
--reporter-html-template ./custom-template.hbs