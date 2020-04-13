<?php

namespace App\Http\Resources\User;


use App\Http\Resources\PrivacySettings;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'isOnline' => $this->isOnline(),
            'lastActivity' => $this->last_activity_dt,
            'profile' => new Profile($this->profile),
            'privacySettings' => new PrivacySettings($this->privacySettings)
        ];
    }

    public function isOnline() : bool
    {
        $period = config('user_activity_margin');
        return $this->last_activity_dt > strtotime("-$period minutes");
    }
}


