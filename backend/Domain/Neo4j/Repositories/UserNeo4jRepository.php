<?php

namespace Domain\Neo4j\Repositories;

use DB;
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
     * @return \GraphAware\Common\Result\Record[]
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
     * @return \GraphAware\Common\Result\Record
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
     * @return \GraphAware\Common\Result\Record[]
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
        \Log::debug($query);
        return $this->client->run($query)->records();
    }
}
