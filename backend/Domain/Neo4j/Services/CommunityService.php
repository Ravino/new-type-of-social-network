<?php

namespace Domain\Neo4j\Service;

use Domain\Neo4j\Repositories\CommunityNeo4jRepository;

class CommunityService
{
    /**
     * @var CommunityNeo4jRepository
     */
    public $communityNeo4jRepository;

    /**
     * UserService constructor.
     */
    public function __construct()
    {
        $this->communityNeo4jRepository = new CommunityNeo4jRepository();
    }

    /**
     * @param $user_oid
     * @param $community_oid
     * @param $limit
     * @param $offset
     * @return array
     */
    public function getFriends($user_oid, $community_oid, $limit, $offset) {
        $friends = $this->communityNeo4jRepository->getFriends($user_oid, $community_oid, $limit, $offset);
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
