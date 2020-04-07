<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Domain\Pusher\WampServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Http\Resources\User as UserResource;

class ProfileController extends Controller
{

    /**
     * @return array
     */
    public function index()
    {
        $channel = $channel = WampServer::channelForUser(Auth::user()->id);
        return ['data' => new \App\Http\Resources\User(Auth::user()->profile), 'channel' => $channel];
    }

    public function show($user)
    {
        $user = User::with('profile')->find($user);
        if(!$user){
            throw new NotFoundHttpException();
        }
        return new UserResource($user);
    }

    /**
     * Patch user account api method.
     * @queryParam email required The email of the user.<br />
     * @queryParam password required The password of the user.<br />
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @authenticated
     * @throws \Illuminate\Validation\ValidationException
     */
    public function patch(Request $request)
    {
        $this->validate($request, Profile::rules($request->keys()));

        Auth::user()->profile->update($request->all());

        return response()->json(['message' => 'updated'], 201);
    }
}
