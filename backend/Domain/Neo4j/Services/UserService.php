<?php

namespace Domain\Neo4j\Service;

use Domain\Neo4j\Models\User;

class UserService
{

    public function create()
    {
        $user = User::insert(['name' => 'Some Name', 'email' => 'some@email.com', 'id' => 'asdhgdfsgsdgsdg']);
        \Log::debug(\GuzzleHttp\json_encode($user));
    }

    public function getFriends($oid) {
        $friends = User::where('oid', $oid)->first()->friends()->get(['oid']);
        \Log::debug(($friends));
    }
}
