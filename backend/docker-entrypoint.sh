#!/bin/bash

php artisan rabbitmq:queue-declare default
while :; do echo "reconnecting"; php artisan queue:work --delay=1 --sleep=1 --tries=3; done
