#!/bin/bash

app_version=git log --pretty="%H" -n1 HEAD
echo "[API] Version: ${app_version}"

php artisan migrate --force
php artisan db:seed --force
exec php artisan swoole:http start
