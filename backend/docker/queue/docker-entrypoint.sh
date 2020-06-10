#!/bin/bash

php artisan rabbitmq:queue-declare default
while :; do echo "reconnecting"; php artisan rabbitmq:consume --tries=3; done
