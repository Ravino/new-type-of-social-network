<?php


namespace Domain\Pusher;


use Domain\Pusher\Events\NewBotMessageEvent;
use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\Events\UserTypingEvent;
use Domain\Pusher\Listeners\UserTypingNotification;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Ratchet\Wamp\WampServerInterface;
use Tymon\JWTAuth\Facades\JWTAuth;

class WampServer implements WampServerInterface
{
    protected $subscribedTopics = [];

    //todo: вынести метод из данного класса.
    public static function sentDataToServer(array $data)
    {
        $ip = gethostbyname(config('pusher.zmq_sub_host'));
        $context = new \ZMQContext();
        $socket = $context->getSocket(\ZMQ::SOCKET_PUSH, 'pusher');
        if (config('app.ws_logs')) {
            echo "< WampServer.sentDataToServer > [ Debug ] zmq_sub_host: 0.0.0.0, socket: " . json_encode($socket) . PHP_EOL;
        }

        try {
            $uri = "tcp://0.0.0.0:5555";
            $socket->connect($uri);
            echo "< WampServer.sentDataToServer > [ Info ] Connected to ZMQSubHost on: $uri". PHP_EOL;
        } catch (\ZMQSocketException $ex) {
            echo "< WampServer.sentDataToServer > [ Exception ] " . $ex->getMessage() . PHP_EOL;
        }

        $data = json_encode($data);
        if (config('app.ws_logs')) {
            echo "< WampServer.sentDataToServer > [ Debug ] data = $data" . PHP_EOL;
        }
        $socket->send($data);
        echo "< WampServer.sentDataToServer >[ Info ] Sent data to ZMQ Sub Server socket. " . PHP_EOL;
    }

    /**
     * Генерирует уникальный канал для пользователя.
     * @param $user_id
     * @return string
     */
    public static function channelForUser($user_id)
    {
        return sha1(json_encode(['user_id' => $user_id, 'topic_id' => 'onNewMessage']));
    }

    /**
     * @param $jsonData
     */
    public function broadcast($jsonData)
    {
        if(config('app.ws_logs')) {
            echo "< WampServer.broadcast > [ Debug ] Broadcasting detected: $jsonData" . PHP_EOL;
        }
        $aDataToSend = json_decode($jsonData, true);
        $topics = $this->getSubscribedTopics();
        if(isset($topics[$aDataToSend['topic_id']])){
            $topic = $topics[$aDataToSend['topic_id']];
            $topic->broadcast($aDataToSend);
        }
    }

    /**
     * @return array
     */
    public function getSubscribedTopics(): array
    {
        return $this->subscribedTopics;
    }

    public function addSubscribedTopic(Topic $topic)
    {
        $this->subscribedTopics[$topic->getId()] = $topic;
    }

    public function onPublish(ConnectionInterface $conn, $topic, $event, array $exclude, array $eligible)
    {
        if(config('app.ws_logs')) {
            echo "< WampServer.onUnSubscribe > [ Debug ] Publish ( topic = $topic, event = $event ) detected: " . json_encode($conn) . PHP_EOL;
        }
        $this->broadcast($event);
    }

    public function onCall(ConnectionInterface $conn, $id, $topic, array $params)
    {
        try {
            $params = json_decode(json_encode($params), true);
            $user_id = $this->getUserIdFronToken($params['token']);
            if($user_id) {
                if($params['event'] === 'user.typing') {
                    event(new UserTypingEvent($params['userId'], $params['chatId']));
                } else if($params['event'] === 'new.message') {
                    if(config('app.ws_logs')) {
                        echo "< WampServer.onCall > [ Debug ] New message sent with data: " . json_encode($params) . PHP_EOL;
                    }
                    if(config('app.test_chat') !== $params['chatId']) {
                        event(new NewMessageEvent($params['body'], $user_id, $params['chatId'], $params['attachments'],
                            $params['replyOnMessageId'] ?? null,
                            $params['forwardFromChatId'] ?? null,
                            $params['toUserId'] ?? null
                        ));
                    } else {
                        event(new NewBotMessageEvent($params['body'], $user_id, $params['chatId'], $params['attachments'],
                            $params['replyOnMessageId'] ?? null,
                            $params['forwardFromChatId'] ?? null,
                            $params['toUserId'] ?? null
                        ));
                    }
                }
            }
        } catch (Exception $ex) {
            echo "< WampServer.onCall > [ Exception ] " . $ex->getMessage() . PHP_EOL;
            Log::error($ex);
        }
    }

    public function onSubscribe(ConnectionInterface $conn, $topic)
    {
        if(config('app.ws_logs')) {
            echo "< WampServer.onUnSubscribe > [ Debug ] Subscribe ( topic = " . json_encode($topic) . " ) detected: " . json_encode($conn) . PHP_EOL;
        }
        $this->addSubscribedTopic($topic);
    }

    public function onUnSubscribe(ConnectionInterface $conn, $topic) {
        if(config('app.ws_logs')) {
            echo "< WampServer.onUnSubscribe > [ Debug ] UnSubscribe ( topic = " . json_encode($topic) . " ) detected: " . json_encode($conn) . PHP_EOL;
        }
    }

    public function onOpen(ConnectionInterface $conn) {
        if(config('app.ws_logs')) {
            echo "< WampServer.onOpen > [ Debug ] New connection detected: " . json_encode($conn) . PHP_EOL;
        }
    }

    public function onClose(ConnectionInterface $conn) {
        if(config('app.ws_logs')) {
            echo "< WampServer.onClose > [ Debug ] Close connection detected: " . json_encode($conn) . PHP_EOL;
        }
    }
    public function onError(ConnectionInterface $conn, \Exception $e) {
        if(config('app.ws_logs')) {
            echo "< WampServer.onError > [ Debug ] Error connection detected: " . json_encode($conn) . PHP_EOL;
        }
        echo "< WampServer.onError > [ Exception ] " . $e->getMessage() . PHP_EOL;
        Log::error($e);
    }
    public function onMessage() {}

    private function getUserIdFronToken($token) {
        JWTAuth::setToken($token);
        $token = JWTAuth::getToken();
        $decode = JWTAuth::decode($token);
        $decode = json_decode(json_encode($decode), true);
        return $decode['sub'];
    }
}
