<?php

namespace Tests\Feature\Auth;

use Tests\Feature\TestApi;

class RegisterTest extends TestApi
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUpdateProfile()
    {
        $email = 'wenfownfowefn' . rand() . '@gmail.com';
        //$token = $this->getAuthToken();
        $response = $this->json(
            'POST',
            '/api/register',
            [
                'email' => $email,
                'firstname' => 'Hoirfjoiejfier',
                'lastname' => 'Jpwejfkpowekfpoew',
            ],
            [
                'Content-Type: application/x-www-form-urlencoded',
                'Cache-Control: no-cache',
            ]
        );

        $response
            ->assertStatus(201)
            ->assertJson(
                [
                    'message' => 'Please confirm email',
                    'email' => $email,
                ]
            );
    }
}
