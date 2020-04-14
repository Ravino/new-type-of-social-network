<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserWithCommunities;
use App\Models\Profile;
use App\Models\User;
use Domain\Pusher\WampServer;
use Illuminate\Http\Request;
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

    public function show($user)
    {
        $user = User::with('profile')->find($user);
        if(!$user) {
            throw new NotFoundHttpException();
        }
        return new UserResource($user);
    }

    public function communities()
    {
        $user = User::with('profile', 'communities')->find(Auth::user()->id);
        if(!$user) {
            throw new NotFoundHttpException();
        }
        return new UserWithCommunities($user);
    }

    /**
     * @param ProfileRequest $request
     * @return ProfileResource
     */
    public function patch(ProfileRequest $request)
    {
        Auth::user()->profile->update(array_filter([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'birthday' => $request->birthday,
            'sex' => $request->sex,
            'city' => $request->city,
            'relationship_user_id' => $request->relationshipUserId,
        ]));
        if(key_exists('relationshipId', $request->post())) {
            Auth::user()->profile->update([
                'relationship_id' => $request->relationshipId,
            ]);
        }
        $profile = User::find(Auth::user()->id)->profile;
        return new ProfileResource($profile);
    }
}
