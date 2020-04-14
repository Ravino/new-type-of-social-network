<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Community\Community;
use App\Http\Resources\User\User;
use App\Models\User as UserModel;
use App\Models\Community as CommunityModel;
use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if($this->postable instanceof UserModel) {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'body' => $this->body,
                'primaryImage' => $this->primary_image,
                'likes' => $this->likes,
                'views' => $this->views,
                'sharesCount' => 25,
                'commentsCount' => 48,
                'user' => new User($this->postable),
                'createdAt' => $this->created_at
            ];
        } else if($this->postable instanceof CommunityModel) {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'body' => $this->body,
                'primaryImage' => $this->primary_image,
                'likes' => $this->likes,
                'views' => $this->views,
                'sharesCount' => 25,
                'commentsCount' => 48,
                'community' => new Community($this->postable),
                'createdAt' => $this->created_at
            ];
        }
    }
}
