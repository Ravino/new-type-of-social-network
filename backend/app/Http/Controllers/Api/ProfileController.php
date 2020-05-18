<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Community\CommunityCollection;
use App\Models\Community;
use App\Models\User;
use Domain\Pusher\WampServer;
use Illuminate\Database\Eloquent\Builder;
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
     * @param Request $request
     * @return CommunityCollection
     */
    public function myCommunities(Request $request)
    {
        $communities = Community::with('role', 'members', 'avatar')
            ->limit($request->query('limit', 10))
            ->offset($request->query('offset', 0))
            ->whereHas('role', static function (Builder $query) {
                $query->where([
                    'user_id' => Auth::user()->id,
                ]);
            });

        $search = $request->search;
        if (mb_strlen($search) < 3) {
            return new CommunityCollection($communities->get());
        }

        $communities->where('name', 'LIKE', "%{$search}%")
            ->orWhere('description', 'LIKE', "%{$search}%")
            ->orWhere('url', 'LIKE', "%{$search}%")
            ->orWhere('website', 'LIKE', "%{$search}%");

        return new CommunityCollection($communities->get());
    }

    /**
     * @param Request $request
     * @return CommunityCollection
     */
    public function ownerCommunities(Request $request)
    {
        $communities = Community::with('role', 'members', 'avatar')
            ->limit($request->query('limit', 10))
            ->offset($request->query('offset', 0))
            ->whereHas('role', static function (Builder $query) {
                $query
                    ->where([
                        'user_id' => Auth::user()->id,
                    ])
                    ->where(static function (Builder $query) {
                        $query
                            ->where([
                                'role' => Community::ROLE_ADMIN,
                            ])
                            ->orWhere([
                                'role' => Community::ROLE_AUTHOR,
                            ]);
                    });
            });

        $search = $request->search;
        if (mb_strlen($search) < 3) {
            return new CommunityCollection($communities->get());
        }

        $communities->where('name', 'LIKE', "%{$search}%")
            ->orWhere('description', 'LIKE', "%{$search}%")
            ->orWhere('url', 'LIKE', "%{$search}%")
            ->orWhere('website', 'LIKE', "%{$search}%");

        return new CommunityCollection($communities->get());
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
