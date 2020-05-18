<?php

namespace App\Http\Resources\Community;

use App\Http\Resources\Geo\City as CityResource;
use App\Http\Resources\User\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

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
            'list' => $this->collection->map(function($community) use ($request) {
                $data = [
                    'id' => $community->id,
                    'name' => $community->name,
                    'notice' => $community->notice,
                    'primaryImage' => $community->primary_image,
                    'url' => $community->url,
                    'website' => $community->website,
                    'location' => $community->city ? new CityResource($community->city) : null,
                    'totalMembers' => $community->members->count(),
                    'role' => $community->role ? $community->role->role : null,
                    'type' => $community->type,
                    'theme' => $community->theme_id ? $community->theme :null,
                    'privacy' => $community->privacy,
                    'friends' => $this->getFriends($community, $request),
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

    private function getFriends($community, $request)
    {
        if (!$friends = $community->friends()) {
            return null;
        }
        $collection = collect($friends);
        $users = User::whereIn('id', $collection->pluck('oid'))
            ->with('profile', 'profile.avatar')
            ->get();
        return [
            'total' => Arr::get($collection->first(), 'total_count'),
            'list' => Arr::get((new CommunityUserCollection($users))->toArray($request), 'list'),
        ];
    }
}
