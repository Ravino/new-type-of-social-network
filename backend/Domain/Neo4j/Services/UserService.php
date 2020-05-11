<?php

namespace Domain\Neo4j\Service;

use Domain\Neo4j\Models\User;
use Domain\Neo4j\Repositories\UserNeo4jRepository;
use Monolog\Logger;

class UserService
{
    /**
     * @var UserNeo4jRepository
     */
    public $userRepository;

    /**
     * UserService constructor.
     */
    public function __construct()
    {
        $this->userRepository = new UserNeo4jRepository();
    }

    /**
     * @param $user_oid
     * @param $my_oid
     * @return array
     */
    public function getFriends($user_oid, $my_oid) {
        $friends = $this->userRepository->getFriends($user_oid, $my_oid);
        $result = [];
        foreach ($friends as $friend) {
            array_push($result, [
                'id' => $friend->get('oid'),
                'mutual_count' => $friend->get('mutual_count')
            ]);
        }
        return $result;
    }

    /**
     * @param $sender_oid
     * @param $recipient_oid
     * @return bool
     */
    public function beFriend($sender_oid, $recipient_oid) {
        return $this->userRepository->beFriend($sender_oid, $recipient_oid);
    }
}
