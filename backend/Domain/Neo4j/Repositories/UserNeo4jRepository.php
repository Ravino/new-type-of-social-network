<?php

namespace Domain\Neo4j\Repositories;

use DB;
use GraphAware\Common\Result\Record;
use Illuminate\Database\ConnectionInterface;
use Domain\Neo4j\Models\User;

class UserNeo4jRepository extends BaseRepository
{

    /**
     * @var ConnectionInterface
     */
    private $connection;

    /**
     * UserNeo4jRepository constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->connection = DB::connection('neo4j');
    }

    /**
     * @param $sender_oid
     * @param $recipient_oid
     * @return bool
     */
    public function beFriend($sender_oid, $recipient_oid) {
        $sender = User::where('oid', $sender_oid)->first();
        $receiver = User::where('oid', $recipient_oid)->first();
        if($sender->friends()->attach($receiver)) {
            return true;
        }
        return false;
    }

    /**
     * @param $oid
     * @param $my_oid
     * @param $limit
     * @param $offset
     * @return Record[]
     */
    public function getFriends($oid, $my_oid, $limit, $offset) {
        $query = "MATCH (user:`User` {oid: '{$oid}'})-[:FRIEND_OF]-(other)
                  WITH COUNT(user) AS total_count
                  MATCH (user:`User` {oid: '{$oid}'})-[:FRIEND_OF]-(other)
                  OPTIONAL MATCH (me:`User` {oid: '{$my_oid}'})-[:FRIEND_OF]-(mf)-[:FRIEND_OF]-(other)
                  WHERE (other)-[:FRIEND_OF]-(user)
                  RETURN other.oid as oid, count(mf) AS mutual_count, total_count
                  ORDER BY mutual_count DESC
                  SKIP {$offset}
                  LIMIT {$limit}";
        return $this->client->run($query)->records();
    }

    /**
     * @param $first_user_oid
     * @param $second_user_oid
     * @return Record
     */
    public function isFriendOfFriendWith($first_user_oid, $second_user_oid) {
        $query = "MATCH (me:`User` {oid: '{$first_user_oid}'})-[:FRIEND_OF]-(mf)-[:FRIEND_OF]-(other: `User`{oid: '{$second_user_oid}'})
                  RETURN COUNT(mf) as count_mutual;";
        return $this->client->run($query)->firstRecord();
    }

    /**
     * @param $oid
     * @param $limit
     * @param $offset
     * @return Record[]
     */
    public function getFriendsOfFriends($oid, $limit, $offset) {
        $query = "MATCH (me: User {oid: '{$oid}'})-[:FRIEND_OF]-(friend), (friend)-[:FRIEND_OF]-(fof)
                  WITH COUNT(fof) AS total_count
                  MATCH (me: User {oid: '{$oid}'})-[:FRIEND_OF]-(friend), (friend)-[:FRIEND_OF]-(fof)
                  WHERE NOT (me)-[:FRIEND_OF]-(fof) AND me <> fof
                  RETURN fof.oid as oid, count(fof) as mutual_count, total_count
                  ORDER BY mutual_count DESC
                  SKIP {$offset}
                  LIMIT {$limit}";
        return $this->client->run($query)->records();
    }

    /**
     * @param $oid
     * @param $limit
     * @param $offset
     * @return Record[]
     */
    public function getRecommendedFriends($oid, $limit, $offset) {
        $query = "MATCH (me: User {oid: '{$oid}'})-[:MEMBER_OF]-(community:Community)-[:MEMBER_OF]-(user:User)
                  WITH COUNT(distinct user) AS total_count
                  MATCH (me: User {oid: '{$oid}'})-[:MEMBER_OF]-(community:Community)-[:MEMBER_OF]-(user:User)
                  OPTIONAL MATCH (me:`User` {oid: '{$oid}'})-[:FRIEND_OF]-(mf)-[:FRIEND_OF]-(user)
                  WHERE NOT (me)-[:FRIEND_OF]-(user) AND me <> user
                  RETURN DISTINCT user.oid as oid, COUNT(community) as frequency, COUNT(mf) as mutual_count, total_count
                  ORDER BY mutual_count DESC
                  SKIP {$offset}
                  LIMIT {$limit}";
        return $this->client->run($query)->records();
    }

    /**
     * @param $oid
     * @param $community_oid
     * @param int $limit
     * @param int $offset
     * @return Record[]
     */
    public function getFriendsFromCommunity($oid, $community_oid, $limit = 5, $offset = 0) {
        $query = "MATCH (me:`User` {oid: '{$oid}'})-[:FRIEND_OF]-(mf)-[:MEMBER_OF]-(n:Community {oid: {$community_oid}})
                  WITH COUNT(mf) AS total_count
                  MATCH (me:`User` {oid: '{$oid}'})-[:FRIEND_OF]-(mf)-[:MEMBER_OF]-(n:Community {oid: {$community_oid}})
                  RETURN mf.oid AS oid, total_count
                  SKIP {$offset}
                  LIMIT {$limit}";
        return $this->client->run($query)->records();
    }

    public function clearAllRelations()
    {
        $this->_clearAllRelations('User');
    }
}
