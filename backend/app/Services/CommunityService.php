<?php


namespace App\Services;


use App\Events\CommunityCreated;
use App\Models\Community;

class CommunityService
{
    public function __construct()
    {
    }

    /**
     * @param $request
     * @return mixed
     */
    public function createCommunity($request) {
        $data = [
            'name' => $request->name,
            'url' => $request->url,
            'type' => $request->type,
            'theme_id' => $request->theme_id,
            'privacy' => $request->privacy,
            'is_verified' => false,
            'created_at' => time(),
            'updated_at' => time(),
        ];
        $community = Community::create($data);
        $community->users()->attach(auth()->user()->id, ['role' => Community::ROLE_AUTHOR]);
        event(new CommunityCreated($community));
        return $community;
    }

    /**
     * @param $request
     * @param $community
     * @return mixed
     */
    public function updateCommunity($request, $community) {
        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'notice' => $request->notice,
            'url' => $request->url,
            'website' => $request->website,
            'location' => $request->location,
            'is_verified' => false,
            'updated_at' => time(),
        ];
        return tap($community)->update($data);
    }

}
