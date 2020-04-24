<?php


namespace Domain\Pusher\Commands;

use Domain\Pusher\WampServer as Pusher;
use Illuminate\Console\Command;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\Wamp\WampServer;
use Ratchet\WebSocket\WsServer;
use React\EventLoop\Factory as ReactLoop;
use React\Socket\SecureServer;
use React\Socket\Server;
use React\ZMQ\Context as ReactContext;


class RunPusherCommand extends Command
{
    protected $signature = 'ws:serve';

    protected $description = 'Run a push server';

    public function handle()
    {
        $loop = ReactLoop::create();
        $pusher = new Pusher();

        $context = new ReactContext($loop);
        $pull = $context->getSocket(\ZMQ::SOCKET_PULL);
        $pull->bind("tcp://0.0.0.0:5555");
        $pull->on('message', [$pusher, 'broadcast']);

        $webSock = new SecureServer(
            new Server('0.0.0.0:7070', $loop),
            $loop,
            [
                'local_cert'        => '/etc/nginx/ssl/live/vm1095330.hl.had.pm/fullchain.pem',
                'local_pk'          => '/etc/nginx/ssl/live/vm1095330.hl.had.pm/privkey.pem',
                'allow_self_signed' => TRUE,
                'verify_peer' => FALSE
            ]
        );
        $server = new IoServer(
            new HttpServer(
                new WsServer(
                    new WampServer(
                    $pusher
                )
            )
        ), $webSock, $loop);
        $this->info("Listen on: {$webSock->getAddress()}");
        $server->run();
    }
}
