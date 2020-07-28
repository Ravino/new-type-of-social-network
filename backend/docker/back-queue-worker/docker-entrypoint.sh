#!/bin/bash

exec php artisan queue:work --quiet
