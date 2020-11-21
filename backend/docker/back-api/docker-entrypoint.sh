#!/bin/bash

#exec php artisan migrate --force
#exec php artisan db:seed --force
exec php artisan swoole:http start
