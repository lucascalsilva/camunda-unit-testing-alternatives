# This script builds the docker image and runs a container, mapping
# the volume /etc/newman to the local folder dockerdata
# after the container runs it is deleted
docker build -t camunda-consulting/postman-camunda-newman dockerimage/
docker run --name postman-camunda-newman -v \
$PWD/dockerdata:/etc/newman \
camunda-consulting/postman-camunda-newman
docker rm postman-camunda-newman --force