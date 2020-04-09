<?php


namespace Domain\Pusher;


use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Ratchet\Wamp\WampServerInterface;

class WampServer implements WampServerInterface
{
    protected $subscribedTopics = [];

    //todo: вынести метод из данного класса.
    public static function sentDataToServer(array $data)
    {
        $context = new \ZMQContext();
        $socket = $context->getSocket(\ZMQ::SOCKET_PUSH, 'pusher');
        $socket->connect(config('pusher.zmq_dsn'));
        $data = json_encode($data);
        $socket->send($data);
    }

    /**
     * Генерирует уникальный канал для пользователя.
     * @param $user_id
     * @return string
     */
    public static function channelForUser(int $user_id)
    {
        return sha1(json_encode(['user_id' => $user_id, 'topic_id' => 'onNewMessage']));
    }

    public function broadcast($jsonData)
    {
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
        $topic->broadcast($event);
    }

    public function onCall(ConnectionInterface $conn, $id, $topic, array $params)
    {
        $conn->callError($id, $topic, 'RPC not supported on this project');
    }

    public function onSubscribe(ConnectionInterface $conn, $topic)
    {
        $this->addSubscribedTopic($topic);
    }

    public function onUnSubscribe(ConnectionInterface $conn, $topic) {}

    public function onOpen(ConnectionInterface $conn){}
    public function onClose(ConnectionInterface $conn) {}
    public function onError(ConnectionInterface $conn, \Exception $e) {}
}
