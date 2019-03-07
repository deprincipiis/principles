#!/bin/bash

idyll build --no-ssr=true -i src/index.idyll --static src/_static -o build
idyll build --no-ssr=true -i src/emergence/index.idyll --static src/emergence/_static -o build/emergence