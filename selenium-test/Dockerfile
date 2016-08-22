FROM silintl/ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y \
      python \
      python-pip \
      wget

RUN curl https://bitbucket.org/silintl/docker-whenavail/raw/master/whenavail -o /usr/local/bin/whenavail && \
    chmod a+x /usr/local/bin/whenavail

RUN mkdir -p /selenium-test
COPY ./ /selenium-test

WORKDIR /selenium-test

RUN pip install -r requirements.txt

ENV SC_DISTRIBUTION sc-4.4.0-rc2-linux

RUN wget https://saucelabs.com/downloads/${SC_DISTRIBUTION}.tar.gz && \
    tar -zxvf ${SC_DISTRIBUTION}.tar.gz

RUN apt-get install -y netcat

CMD ["./run-tests.sh"]
