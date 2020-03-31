<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile;
use App\Models\User;
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

    public function index()
    {

        return new \App\Http\Resources\User(Auth::user()->profile);
    }


    public function patch(Request $request)
    {
        $this->validate($request, Profile::rules($request->keys()));

        Auth::user()->profile->update($request->all());

        return response()->json(['message' => 'updated'], 201);
    }
}
