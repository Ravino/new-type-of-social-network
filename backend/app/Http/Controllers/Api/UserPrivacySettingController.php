<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Domain\Pusher\WampServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserPrivacySettingController extends Controller
{

    /**
     * Patch user privacy settings api method.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function patch(Request $request)
    {
        $this->validate($request, User\PrivacySettings::rules($request->keys()));

        if (!Auth::user()->privacySettings instanceof User\PrivacySettings) {
            Auth::user()->privacySettings()->create(['user_id' => Auth::user()->id]);
        }

        Auth::user()->privacySettings()->update(array_filter([
            'page_type' => $request->pageType,
            'write_messages_permissions' => $request->writeMessagesPermissions,
            'post_wall_permissions' => $request->postWallPermissions,
            'view_wall_permissions' => $request->viewWallPermissions,
            'view_friends_permissions' => $request->viewFriendsPermissions,
            'two_factor_auth_enabled' => $request->twoFactorAuthEnabled,
            'sms_confirm' => $request->smsConfirm,
        ]));

        return response()->json(['message' => 'updated'], 201);
    }
}
