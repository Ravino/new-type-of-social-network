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
                        'id',
                        'email',
                        'profile',
                        'privacySettings',
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
                'first_name' => 'Newname',
                'last_name' => 'Newlastname',
            ],
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
                        'firstName',
                        'lastName',
                        'sex',
                        'birthday',
                    ],
                ]
            );
    }
}
