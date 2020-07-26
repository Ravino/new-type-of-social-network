#!/bin/bash

app_version=git log --pretty="%H" -n1 HEAD
echo "[WebSocket] Version: ${app_version}"

exec php artisan ws:serve
