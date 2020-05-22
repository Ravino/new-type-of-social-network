<?php

namespace App\Http\Resources\Sessions;

use App\Http\Resources\User\SimpleUser;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SessionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function ($session) {
                return [
                    'id' => $session->id,
                    'token' => $session->token,
                    'userAgent' => $session->user_agent,
                    'ip' => $session->ip,
                    'isActive' => $session->is_active,
                    'createdAt' => $session->created_at,
                ];
            }),
        ];
    }
}
