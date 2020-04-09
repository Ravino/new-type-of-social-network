<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User\Blacklisted;
use Domain\Pusher\WampServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Http\Resources\User as UserResource;

class UserBlacklistController extends Controller
{

    /**
     * Add user to blacklist api method.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function post(Request $request)
    {
        $userId = $request->get('user_id');
        if ((int) $userId > 0) {
            \DB::table('users_blacklisted')->insertOrIgnore([
                ['user_id' => Auth::user()->id, 'blacklisted_id' => $userId],
            ]);
        }
        return response()->json(['message' => 'Added'], 200);
    }

    /**
     * Delete user from blacklist api method.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        $userId = $request->get('user_id');
        if ((int) $userId > 0) {
            \DB::table('users_blacklisted')
                ->where('user_id', Auth::user()->id)
                ->where('blacklisted_id', $userId)
                ->delete();
        }
        return response()->json(['message' => 'Deleted'], 200);
    }
}
