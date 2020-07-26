#!/bin/bash

app_version=git log --pretty="%H" -n1 HEAD
echo "[QueueWorker] Version: ${app_version}"

exec php artisan queue:work redis --queue=high,default
