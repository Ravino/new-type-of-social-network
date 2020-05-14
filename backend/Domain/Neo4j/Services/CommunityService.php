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
}
