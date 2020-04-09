<?php


namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class Profile extends JsonResource
{
    public function toArray($request)
    {
        return [
            'firstName' => $this->firstname,
            'lastName' => $this->lastname,
            'sex' => $this->sex,
            'birthday' => $this->birthday,
            'city' => $this->city,
            'relationship' => $this->relationship,
            'user_pic' => $this->user_pic,
        ];
    }
}
