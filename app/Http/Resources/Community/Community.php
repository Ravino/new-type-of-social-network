<?php

namespace App\Http\Resources\Community;

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
        if($this->relationLoaded('users')) {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'description' => $this->description,
                'notice' => $this->notice,
                'primary_image' => $this->primary_image,
                'url' => $this->url,
                'website' => $this->website,
                'location' => $this->location,
                'users' => new CommunityUserCollection($this->users)
            ];
        } else {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'description' => $this->description,
                'notice' => $this->notice,
                'primary_image' => $this->primary_image,
                'url' => $this->url,
                'website' => $this->website,
                'location' => $this->location
            ];
        }
    }
}
