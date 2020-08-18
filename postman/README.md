# Camunda Unit Tests with Newman
A sample project that uses unit testing with newman (postman cli) and docker to test a Camunda process.

You can find more information about newman in docker in the following links: https://hub.docker.com/r/postman/newman_alpine33, https://github.com/DannyDainton/postman-docker

## Show me the important parts!
Process used as part of the sample:

![BPMN Process](payment-process.png)

## How does it work?
This project is based in the script "run.sh" that does the following: 
1. Builds a [docker image](dockerimage/Dockerfile) that runs both Camunda and a small NodeJS application that calls newman.
2. Runs a docker container based on the image previously created. The main script executed is [this one](dockerimage/run.sh), which starts both Camunda and newman NodeJS app.
3. After the container is finished executing, it is deleted.

The folder [dockerdata](dockerdata) contains some files that are necessary for the test, such as:
1. Payment process postman collections [1](dockerdata/tests/payment-process/payment-process.postman_collection.json) and [2](dockerdata/tests/payment-process/payment-process-credit-card-issue.postman_collection.json): These are the collections that are executed in postman. Both these collections test parts of the the [payment process](dockerdata/tests/payment-process/payment-process.bpmn).
2. [BPMN Process](dockerdata/tests/payment-process/payment-process.bpmn):	The BPMN used in the test. You can overwrite the bpmn according to your needs.
3. [Postman environment](dockerdata/tests/payment-process.postman_environment.json): This is the environment that is used in postman. It is shared between all tests. You can modify the environment in postman according to your needs.
4. [Newman HTML Template](dockerdata/custom-template.hbs): The HTML template used to generate the testing result report. It was obtained [here](https://github.com/DannyDainton/postman-docker/blob/master/src/reports/templates/customTemplate.hbs).

To add new tests, just create a new folder inside "dockerdata/tests". The process and collection should have the following naming standard:

1. Create a testing folder.
1. Add the BPMN Process: {test-folder-name}/{test-folder-name}.bpmn
2. Add the collection: {test-folder-name}/collections/{test-folder-name}.postman_collection.json

You can add as many collections as needed. As a best practice, make sure that each collection is independent from the other.

Make sure that your collections clean up the deployment, to assure data isolation. The best way to achieve this is to save the "deploymentId" as a variable, and at the end of your collection send it as part of this call.
```
DELETE {{camunda-base-url}}/deployment/{{deploymentId}}?cascade=true
```

Please check the existing collections for reference.

## How to use it?
You can execute it by running the script [run.sh](run.sh), or by manually running the following commands:
```
docker build -t camunda-consulting/postman-camunda-newman dockerimage/
docker run --env BASE_TEST_DIR=/etc/newman \
--env CAMUNDA_URL=http://localhost:8080/engine-rest/engine \
--name postman-camunda-newman \
-v $PWD/dockerdata:/etc/newman \
camunda-consulting/postman-camunda-newman
```

After the execution, you can delete the created container with the following command:
```
docker rm postman-camunda-newman --force
```

A HTML testing report will be available in the folder "dockerdata/tests/{test-folder-name}/collections/output". The naming convention will be: "{collection-file-name}-{timestamp}.html". Here is an example: payment-process-credit-card-issue.postman_collection.json-1597761819531.html

![HTML Report](html-report.png)

## Environment Restrictions

Tested with docker 19.03.5 in MacOS High Sierra (10.13.6).

* Camunda Run docker image: [Camunda Run 7.13.0](https://hub.docker.com/layers/camunda/camunda-bpm-platform/run-7.13.0/images/sha256-82869e702cae4b8c236fc5e1923524c3cf4ed864a78677ca470b9c4570ce3cb6?context=explore)
* NodeJS version: 10.19.0-r0
* Newman version: 5.1.2

## Known Limitations

The main script is a SH script, so it only runs in UNIX environments. To run in Windows, just run the commands separately.

## Improvements Backlog

* Create a script to run it in Windows.
* Create testing in the NodeJS application.

## License
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
