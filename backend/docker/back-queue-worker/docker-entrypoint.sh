#!/bin/bash

php artisan optimize
exec php artisan queue:work --queue=high,default
