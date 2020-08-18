FROM camunda/camunda-bpm-platform:run-7.13.0

USER root

ENV NODE_VERSION 10.19.0-r0
ENV NPM_VERSION 10.19.0-r0

# Set locale
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Install node
RUN apk add --update nodejs=${NODE_VERSION} npm=${NPM_VERSION}

# Install camunda-newman-app
WORKDIR /camunda-newman-app
COPY ./camunda-newman-app/package.json ./
RUN npm install
COPY ./camunda-newman-app/* ./

USER camunda

COPY run.sh /camunda/

CMD ["/camunda/run.sh"]

WORKDIR /etc/newman