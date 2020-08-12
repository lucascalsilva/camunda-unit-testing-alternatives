FROM camunda/camunda-bpm-platform:run-7.13.0

USER root

ENV NODE_VERSION 10.19.0-r0
ENV NPM_VERSION 10.19.0-r0

# Set locale
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# Install node
#nodejs-npm=${NODE_NPM_VERSION} 
RUN apk add --update nodejs=${NODE_VERSION} npm=${NPM_VERSION}

# Set newman version
ENV NEWMAN_VERSION 5.1.2
ENV NEWMAN_REPORT_HTML_VERSION 1.0.5

# Install newman
RUN npm install -g newman@${NEWMAN_VERSION} newman-reporter-html@${NEWMAN_REPORT_HTML_VERSION}

USER camunda

COPY run.sh /camunda/

CMD ["/camunda/run.sh"]

WORKDIR /etc/newman