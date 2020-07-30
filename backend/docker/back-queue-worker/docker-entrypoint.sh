#!/bin/bash

exec php artisan queue:work --quiet --queue=redis2,redis
