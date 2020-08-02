#!/bin/bash

# exec php artisan queue:work --quiet --queue=redis2,redis
echo "starting..."
pgrep -fl supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
