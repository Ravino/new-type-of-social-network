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
     * @return \GraphAware\Common\Result\Record[]
     */
    public function getFriends($oid, $my_oid) {
        $query = "MATCH (user:`User` {oid: '{$oid}'})-[:FRIEND_OF]-(other)
                  OPTIONAL MATCH (me:`User` {oid: '{$my_oid}'})-[:FRIEND_OF]-(mf)-[:FRIEND_OF]-(other)
                  WHERE (other)-[:FRIEND_OF]-(user)
                  RETURN other.oid as oid, count(mf) AS mutual_count";
        return $this->client->run($query)->records();
    }
}
