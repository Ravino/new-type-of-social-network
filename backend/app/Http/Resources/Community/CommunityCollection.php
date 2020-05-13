<?php

namespace App\Http\Resources\Community;

use App\Http\Resources\User\Image;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CommunityCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(static function($community) {
                $data = [
                    'id' => $community->id,
                    'name' => $community->name,
                    'notice' => $community->notice,
                    'primaryImage' => $community->primary_image,
                    'url' => $community->url,
                    'website' => $community->website,
                    'location' => $community->location,
                    'totalMembers' => $community->members->count(),
                    'role' => $community->role ? $community->role->role : null,
                    'type' => $community->type,
                    'theme' => $community->theme_id ? $community->theme :null,
                    'privacy' => $community->privacy,
                    'avatar' => $community->avatar
                        ? new Image($community->avatar)
                        : null,
                ];

                if($community && $community->relationLoaded('onlyFiveMembers')) {
                    $data ['members'] = new CommunityUserCollection($community->onlyFiveMembers);
                }

                return $data;
            }),
        ];
    }
}
