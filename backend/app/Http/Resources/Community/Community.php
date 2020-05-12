<?php

namespace App\Http\Resources\Community;

use App\Http\Resources\User\Image;
use Illuminate\Http\Resources\Json\JsonResource;

class Community extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'notice' => $this->notice,
            'primaryImage' => $this->primary_image,
            'url' => $this->url,
            'website' => $this->website,
            'location' => $this->location,
            'totalMembers' => $this->members->count(),
            'role' => $this->role ? $this->role->role : null,
            'avatar' => $this->avatar ? new Image($this->avatar) : null,
        ];
        if($this && $this->relationLoaded('users')) {
            $data['members'] = new CommunityUserCollection($this->users);
        }

        return $data;
    }
}
