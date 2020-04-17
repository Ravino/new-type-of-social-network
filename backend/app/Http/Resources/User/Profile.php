<?php


namespace App\Http\Resources\User;

use App\Http\Resources\Geo\City as CityResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Profile extends JsonResource
{
    public function toArray($request)
    {
        return [
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'sex' => $this->sex,
            'birthday' => $this->birthday,
            'location' => new CityResource($this->city),
            'relationshipId' => $this->relationship_id,
            'userPic' => $this->user_pic,
        ];
    }
}
