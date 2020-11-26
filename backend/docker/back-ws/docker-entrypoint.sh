#!/bin/bash

#exec composer update
exec php artisan ws:serve
#exec php artisan queue:work --queue=redis2,redis &
