<?php
return [

    'websocket_uri' => env('WEBSOCKET_URI', '127.0.0.1:8080'),


    'zmq_dsn' => env('ZMQ_DSN', 'tcp://127.0.0.1:5555'),

    'zmq_pub_address' => env('ZMQ_PUB_ADDRESS', 'tcp://127.0.0.1:5555'),

    'zmq_bind_address' => env('ZMQ_BIND_ADDRESS', 'tcp://127.0.0.1:5555')
];
