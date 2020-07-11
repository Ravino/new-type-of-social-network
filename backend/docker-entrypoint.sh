#!/bin/bash

php artisan optimize
exec php artisan ws:serve
