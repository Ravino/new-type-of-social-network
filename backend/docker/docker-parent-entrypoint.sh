#!/bin/bash

parent_app_version=`git log --pretty="%H" -n1 HEAD`
echo "[Laravel] Version: ${parent_app_version}"

#php artisan optimize
