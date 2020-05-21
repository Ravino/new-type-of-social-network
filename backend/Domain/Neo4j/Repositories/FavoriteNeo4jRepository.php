<?php

namespace Domain\Neo4j\Repositories;

use Exception;
use GraphAware\Common\Result\Record;

class FavoriteNeo4jRepository extends BaseRepository
{

    /**
     * @var string
     */
    private $targetName;

    /**
     * @var string
     */
    private $relationName;

    /**
     * @var string
     */
    private $relationAttribute = 'is_favorite';

    /**
     * FavoriteNeo4jRepository constructor.
     * @param string $targetName
     * @param string $relationName
     */
    public function __construct($targetName, $relationName)
    {
        $this
            ->setTargetName($targetName)
            ->setRelationName($relationName);
        parent::__construct();
    }


    /**
     * @param $user_oid
     * @param $target_oid
     * @return int|null
     */
    public function getMemberId($user_oid, $target_oid)
    {
        $query = "MATCH (u:User {oid:'{$user_oid}'})-[r:{$this->relationName}]-(c:{$this->targetName} {oid:{$target_oid}})
                  RETURN id(r) AS id";
        try {
            $result = $this->client->run($query)->firstRecord();
        } catch (Exception $e) {
            return null;
        }
        return $result->get('id');
    }

    /**
     * @param $user_oid
     * @param $target_oid
     * @return bool
     */
    public function isMemberOf($user_oid, $target_oid)
    {
        return (bool)$this->getMemberId($user_oid, $target_oid);
    }

    /**
     * @param $user_oid
     * @param $target_oid
     * @return bool
     */
    public function subscribeAsMember($user_oid, $target_oid)
    {
        return $this->_su($user_oid, $target_oid, 1);
    }

    /**
     * @param $user_oid
     * @param $target_oid
     * @return bool
     */
    public function unsubscribeFromMember($user_oid, $target_oid)
    {
        return $this->_su($user_oid, $target_oid, 0);
    }

    private function _su($user_oid, $target_oid, $val)
    {
        if (!$id = $this->getMemberId($user_oid, $target_oid)) {
            return false;
        }

        $query = "MATCH ()-[r]-() WHERE id(r)={$id} SET r.is_favorite={$val} RETURN id(r)";
        try {
            $this->client->run($query)->firstRecord();
        } catch (Exception $e) {
            return false;
        }

        return true;
    }

    /**
     * @param string $targetName
     * @return self
     */
    public function setTargetName($targetName)
    {
        $this->targetName = $targetName;
        return $this;
    }

    /**
     * @param string $relationName
     * @return self
     */
    public function setRelationName(string $relationName)
    {
        $this->relationName = $relationName;
        return $this;
    }

    /**
     * @param string $relationAttribute
     * @return self
     */
    public function setRelationAttribute(string $relationAttribute)
    {
        $this->relationAttribute = $relationAttribute;
        return $this;
    }

    /**
     * @param $user_oid
     * @param int $limit
     * @param int $offset
     * @return array|Record[]
     */
    public function getIdList($user_oid, $limit = 20, $offset = 0)
    {
        $query = "MATCH (u:User {oid: '{$user_oid}'})-[r:{$this->relationName} {is_favorite:1}]-(c:{$this->targetName})
                  RETURN c.oid AS oid
                  SKIP {$offset}
                  LIMIT {$limit}";

        try {
            $list = $this->client->run($query)->records();
        } catch (Exception $e) {
            return [];
        }

        return $list;
    }
}
