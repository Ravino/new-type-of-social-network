<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use Tests\Feature\TestApi;

class ProfileTest extends TestApi
{
    /**
     * @return void
     */
    public function testIndexProfile()
    {
        $token = $this->getAuthToken();
        /* @var TestResponse $response */
        $response = $this->json(
            'GET',
            '/api/user',
            [],
            [
                'Content-Type: application/x-www-form-urlencoded',
                'Cache-Control: no-cache',
                'Authorization' => 'Bearer ' . $token . '',
            ]
        );
        $response
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    'data' => [
                        'firstname',
                        'lastname',
                        'sex',
                        'birthday',
                    ],
                    'channel',
                ]
            );
    }

    /**
     * @return void
     */
    public function testUpdateProfile()
    {
        $token = $this->getAuthToken();
        $response = $this->json(
            'PATCH',
            '/api/user',
            [
                'firstname' => 'Hoirfjoiejfier',
                'lastname' => 'Jpwejfkpowekfpoew',
            ],
            [
                'Content-Type: application/x-www-form-urlencoded',
                'Cache-Control: no-cache',
                'Authorization' => 'Bearer ' . $token . '',
            ]
        );
        $response
            ->assertStatus(201)
            ->assertJson(
                [
                    'message' => 'updated',
                ]
            );
    }
}
