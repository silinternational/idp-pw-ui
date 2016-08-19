#!/usr/bin/env bash

${SC_DISTRIBUTION}/bin/sc -u ${SAUCE_USERNAME} -k ${SAUCE_ACCESS_KEY} &

# Start selenium tests
whenavail localhost 4445 60 py.test -n 5 tests
