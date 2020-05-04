<?php

namespace App\Http\Resources\Community;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CommunityCollection extends ResourceCollection
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
            'list' => $this->collection->map(function($community) {
                if($community && $community->relationLoaded('onlyFiveMembers')) {
                    return [
                        'id' => $community->id,
                        'name' => $community->name,
                        'notice' => $community->notice,
                        'primaryImage' => $community->primary_image,
                        'url' => $community->url,
                        'website' => $community->website,
                        'location' => $community->location,
                        'totalUsers' => $community->members->count(),
                        'role' => $community->role ? $community->role->role : null,
                        'members' => new CommunityUserCollection($community->onlyFiveMembers)
                    ];
                } else {
                    return [
                        'id' => $community->id,
                        'name' => $community->name,
                        'notice' => $community->notice,
                        'primaryImage' => $community->primary_image,
                        'url' => $community->url,
                        'website' => $community->website,
                        'location' => $community->location,
                        'totalUsers' => $community->members->count(),
                        'role' => $community->role ? $community->role->role : null
                    ];
                }
            }),
        ];
    }
}
