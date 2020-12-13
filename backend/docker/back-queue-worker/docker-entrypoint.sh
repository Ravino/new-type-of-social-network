#!/bin/bash

#exec php artisan queue:work redis --queue=high,default
exec php artisan queue:work --queue=redis2,redis
#exec php artisan queue:work --quiet --queue=redis2,redis
echo "Starting..."
pgrep -fl supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
