<?php

namespace App\Http\Resources\Community;

use App\Http\Resources\Post\AttachmentsCollection;
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
                    'totalUsers' => $community->members->count(),
                    'role' => $community->role ? $community->role->role : null,
                    'attachment' => $community->attachment
                        ? new AttachmentsCollection([$community->attachment])
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
