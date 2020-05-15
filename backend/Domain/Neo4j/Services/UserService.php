<?php

namespace Domain\Neo4j\Service;

use Domain\Neo4j\Models\User;
use Domain\Neo4j\Repositories\CommunityNeo4jRepository;
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
     * @param $limit
     * @param $offset
     * @return array
     */
    public function getFriends($user_oid, $my_oid, $limit, $offset) {
        $friends = $this->userRepository->getFriends($user_oid, $my_oid, $limit, $offset);
        $result = [];
        foreach ($friends as $friend) {
            $result[$friend->get('oid')] = [
                'mutual_count' => $friend->get('mutual_count'),
                'total_count' => $friend->get('total_count'),
            ];
        }
        return $result;
    }

    /**
     * @param $first_user_oid
     * @param $second_user_oid
     * @return bool
     */
    public function isFriendOfFriendWith($first_user_oid, $second_user_oid) : bool {
        $countMutual = $this->userRepository->isFriendOfFriendWith($first_user_oid, $second_user_oid);
        return !!$countMutual->get('count_mutual');
    }

    /**
     * @param $user_id
     * @param $limit
     * @param $offset
     * @return array
     */
    public function getFriendsOfFriends($user_id, $limit, $offset) {
        $fof = $this->userRepository->getFriendsOfFriends($user_id, $limit, $offset);
        $result = [];
        foreach ($fof as $friend) {
            $result[$friend->get('oid')] = [
                'mutual_count' => $friend->get('mutual_count'),
                'total_count' => $friend->get('total_count'),
            ];
        }
        return $result;
    }

    /**
     * @param $user_id
     * @param $limit
     * @param $offset
     * @return array
     */
    public function getRecommendedFriends($user_id, $limit, $offset) {
        $recommended = $this->userRepository->getRecommendedFriends($user_id, $limit, $offset);
        $result = [];
        foreach ($recommended as $user) {
            $result[$user->get('oid')] = [
                'mutual_count' => $user->get('mutual_count'),
                'total_count' => $user->get('total_count'),
            ];
        }
        return $result;
    }

    /**
     * @param $user_oid
     * @param $community_oid
     * @param $limit
     * @param $offset
     * @return array
     */
    public function getFriendsFromCommunity($user_oid, $community_oid, $limit, $offset) {
        $friends = $this->userRepository->getFriendsFromCommunity($user_oid, $community_oid, $limit, $offset);
        $result = [];
        foreach ($friends as $friend) {
            $result[] = [
                'oid' => $friend->get('oid'),
                'total_count' => $friend->get('total_count'),
            ];
        }
        return $result;
    }
}
