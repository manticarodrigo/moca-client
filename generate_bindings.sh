#!/usr/bin/env bash

rm -rfv src/services/openapi

openapi-generator generate -g typescript-axios -i moca-api/moca.yaml -o src/services/openapi/ --skip-validate-spec
