#!/bin/bash

app_version=git log --pretty="%H" -n1 HEAD
echo "[Laravel] Version: ${app_version}"

php artisan optimize
