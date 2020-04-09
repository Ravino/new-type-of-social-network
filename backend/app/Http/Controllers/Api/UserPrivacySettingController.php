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

class UserPrivacySettingController extends Controller
{

    /**
     * Patch user privacy settings api method.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function patch(Request $request)
    {
        $this->validate($request, User\PrivacySettings::rules($request->keys()));

        if (!Auth::user()->privacySettings instanceof User\PrivacySettings) {
            Auth::user()->privacySettings()->create(['user_id' => Auth::user()->id]);
        }

        Auth::user()->privacySettings()->update($request->all());

        return response()->json(['message' => 'updated'], 201);
    }
}
