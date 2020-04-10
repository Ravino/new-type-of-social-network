<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Community\CommunityUserCollection;
use App\Http\Resources\User\UserCollection;
use App\Models\Profile;
use App\Models\User;
use Domain\Pusher\WampServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{

    /**
     * @param Request $request
     * @return UserCollection|\Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $search = $request->get('search', '');
        if (!empty($search)) {
            $users = User::whereHas('profile', function($profile) use ($search) {
                $profile
                    ->where('first_name', 'LIKE', "%{$search}%")
                    ->orWhere('last_name', 'LIKE', "%{$search}%")
                    ->orderBy('last_name');
            })->orWhere('email', 'LIKE', "%{$search}%")
                ->limit(10)
                ->get();
            return new UserCollection($users);
        }
        return response()->json(['message' => 'No found'], 200);
    }
}
