#!/usr/bin/env bash

${SC_DISTRIBUTION}/bin/sc -u ${SAUCE_USERNAME} -k ${SAUCE_ACCESS_KEY} &

sleep 30

py.test -n 5 tests
