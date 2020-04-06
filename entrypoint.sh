#!/bin/sh
/usr/local/bin/dockerize -timeout 60s -wait tcp://${DB_HOST}:3306

role=${CONTAINER_ROLE:-app}
echo "$role"
set -e
if [ "$role" = "php-ws" ]; then
    php /var/www/artisan ws:serve
else
    echo 'running migrations'
    php artisan migrate --force
    echo 'migrations done'
    echo 'seeding database'
    php artisan db:seed
    echo 'seeds done'
    exec php-fpm
fi

