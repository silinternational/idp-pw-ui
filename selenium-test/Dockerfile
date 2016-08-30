FROM silintl/ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y \
      python \
      python-pip \
      wget

RUN mkdir -p /selenium-test
COPY ./ /selenium-test

WORKDIR /selenium-test

RUN pip install -r requirements.txt

ENV SC_DISTRIBUTION sc-4.4.0-rc2-linux

RUN wget https://saucelabs.com/downloads/${SC_DISTRIBUTION}.tar.gz && \
    tar -zxvf ${SC_DISTRIBUTION}.tar.gz

CMD ["./run-tests.sh"]
