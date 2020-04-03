<?php

namespace Tests\Feature;

use Tests\TestCase;

class TestApi extends TestCase
{
    protected function getAuthToken($returnAllResponse = false)
    {
        $response = $this->json(
            'post',
            '/api/login',
            [
                'email' => 'test@gmail.com',
                'password' => 'secret',
            ],
            [
                'Content-Type: application/x-www-form-urlencoded',
                'Accept: application/json',
            ]
        );
        if ($returnAllResponse) {
            return $response;
        }
        $responseArr = json_decode($response->getContent(), true);
        return $responseArr['token'];
    }
}
