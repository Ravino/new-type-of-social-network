<?php

namespace Domain\Neo4j\Repositories;

use DB;
use Domain\Neo4j\Models\Community;
use GraphAware\Common\Result\Record;
use Illuminate\Database\ConnectionInterface;
use Domain\Neo4j\Models\User;

class CommunityNeo4jRepository extends BaseRepository
{

    /**
     * @var ConnectionInterface
     */
    private $connection;

    /**
     * CommunityNeo4jRepository constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->connection = DB::connection('neo4j');
    }

    /**
     * @param $community_oid
     * @param $member_oid
     * @return bool
     */
    public function beMember($community_oid, $member_oid) {
        /** @var Community $community */
        $community = Community::where('oid', $community_oid)->first();
        $member = User::where('oid', $member_oid)->first();
        return (bool) $community->members()->attach($member);
    }

    /**
     * @param $oid
     * @param $community_oid
     * @param int $limit
     * @param int $offset
     * @return Record[]
     */
    public function getFriends($oid, $community_oid, $limit = 5, $offset = 0) {
        $query = "MATCH (me:`User` {oid: '{$oid}'})-[:FRIEND_OF]-(mf)-[:MEMBER_OF]-(n:Community {oid: {$community_oid}})
                  WITH COUNT(mf) AS total_count
                  MATCH (me:`User` {oid: '{$oid}'})-[:FRIEND_OF]-(mf)-[:MEMBER_OF]-(n:Community {oid: {$community_oid}})
                  RETURN mf.oid AS oid, total_count
                  SKIP {$offset}
                  LIMIT {$limit}";
        return $this->client->run($query)->records();
    }
}
