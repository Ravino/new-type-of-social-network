<?php

namespace App\Http\Resources\Sessions;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SessionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function ($session) {
                return [
                    'id' => $session->id,
                    'token' => $session->token,
                    'userAgent' => $this->detectBrowser($session),
                    'ip' => $session->ip,
                    'isActive' => $session->is_active,
                    'createdAt' => $session->created_at,
                ];
            }),
        ];
    }

    public function detectBrowser($session)
    {
        if (strpos($session->user_agent, 'Chrome')) {
            return 'Chrome';
        } else if (strpos($session->user_agent, 'Safari')) {
            return 'Safari';
        } else if (strpos($session->user_agent, 'Firefox')) {
            return 'Firefox';
        } else if (strpos($session->user_agent, '/Edge/i')) {
            return 'MS Edge';
        } else {
            return $session->user_agent;
        }
    }
}
