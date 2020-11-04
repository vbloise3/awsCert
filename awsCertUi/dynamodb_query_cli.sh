#!/bin/sh
search_string="$1"
aws dynamodb scan --table-name CMLQandA --region us-west-2 \
      --projection-expression "info.question, id" \
      --filter-expression 'contains(info.question,:gen)' \
      --expression-attribute-values '{":gen":{"S":search_string}}'
