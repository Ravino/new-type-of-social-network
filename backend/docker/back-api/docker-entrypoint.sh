#!/bin/bash

#exec php artisan migrate --force
#exec php artisan db:seed --force
exec echo $(ls -la)
exec php artisan swoole:http start

