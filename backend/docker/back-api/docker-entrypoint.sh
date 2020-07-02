#!/bin/bash

php artisan optimize
php artisan migrate --force
php artisan db:seed --force
exec php artisan swoole:http start
