<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Community\CommunityCollection;
use App\Models\User;
use Domain\Pusher\WampServer;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Http\Resources\User\User as UserResource;
use App\Http\Requests\Profile\Profile as ProfileRequest;
use App\Http\Resources\User\Profile as ProfileResource;

class ProfileController extends Controller
{

    /**
     * @return array
     */
    public function index()
    {
        $channel = $channel = WampServer::channelForUser(Auth::user()->id);
        return ['data' => new UserResource(Auth::user()), 'channel' => $channel];
    }

    /**
     * @param $user
     * @return UserResource
     */
    public function show($user)
    {
        $user = User::with('profile')->find($user);
        if(!$user) {
            throw new NotFoundHttpException();
        }
        return new UserResource($user);
    }

    /**
     * @param $id
     * @return CommunityCollection
     */
    public function userCommunities($id)
    {
        $user = User::with('communities')->find($id);
        return new CommunityCollection($user->communities);
    }

    /**
     * @param ProfileRequest $request
     * @return ProfileResource
     */
    public function patch(ProfileRequest $request)
    {
        $user = User::find(Auth::user()->id);
        $user->profile->update(array_filter([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'birthday' => $request->birthday,
            'sex' => $request->sex,
            'geo_city_id' => $request->geoCityId,
            'relationship_user_id' => $request->relationshipUserId,
        ]));
        if(key_exists('relationshipId', $request->post())) {
            $user->profile->update([
                'relationship_id' => $request->relationshipId,
            ]);
        }
        $profile = $user->fresh()->profile;
        return new ProfileResource($profile);
    }
}
