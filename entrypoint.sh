#!/bin/sh
if [ "$@" = '/var/www/html/vendor/bin/phpunit'  ]; then
    /usr/local/bin/dockerize -timeout 60s -wait tcp://${DB_HOST}:3306
    set -e
    echo 'running migrations'
    php artisan migrate --force
    echo 'migrations done'
    echo 'seeding database'
    php artisan db:seed
    echo 'seeds done'
fi
exec "$@"
