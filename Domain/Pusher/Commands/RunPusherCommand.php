<?php


namespace Domain\Pusher\Commands;

use Domain\Pusher\WampServer as Pusher;
use Illuminate\Console\Command;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\Wamp\WampServer;
use Ratchet\WebSocket\WsServer;
use React\EventLoop\Factory as ReactLoop;
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
        $pull->bind(config('pusher.zmq_dsn'));
        $pull->on('message', [$pusher, 'broadcast']);


        $webSock = new Server(config('pusher.websocket_uri'),$loop);
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
