<?php

namespace Tests\Feature\Api;

use Tests\Feature\TestApi;

class ProfileTest extends TestApi
{
    /**
     * A basic feature test example.
     *
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
