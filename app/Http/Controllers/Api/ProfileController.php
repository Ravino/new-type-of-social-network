<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile;
use App\Models\User;
use Domain\Pusher\WampServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

use App\Http\Controllers\Controller;
use Carbon\Carbon;

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
