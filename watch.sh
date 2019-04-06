#!/bin/sh

while true; do
  make -q || (
    printf "\n\e[1m--- changes detected ---\e[m\n\n";
    make;
    printf "\n\e[1m--- make complete ---\e[m\n\n"
  );
  sleep 0.5;
done