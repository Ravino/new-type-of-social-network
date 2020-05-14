<?php

namespace App\Http\Resources\Community;

use App\Http\Resources\User\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class Community extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
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
            'friends' => $this->getFriends($request),
        ];
        if ($this && $this->relationLoaded('users')) {
            $data['members'] = new CommunityUserCollection($this->users);
        }

        return $data;
    }

    private function getFriends($request)
    {
        if (!$friends = $this->friends()) {
            return null;
        }
        $collection = collect($friends);
        $users = User::whereIn('id', $collection->pluck('oid'))
            ->with('profile')
            ->get();
        return [
            'total' => Arr::get($collection->first(), 'total_count'),
            'list' => Arr::get((new CommunityUserCollection($users))->toArray($request), 'list'),
        ];
    }
}
