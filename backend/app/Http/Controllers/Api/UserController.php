<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\AddToFriend;
use App\Http\Resources\User\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    /**
     * @param AddToFriend $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendFriendshipRequest(AddToFriend $request) {
        $recipient = User::find($request->userId);
        if($recipient->hasFriendRequestFrom(Auth::user())) {
            return response()->json(['message' => 'Вы уже отправляли запрос данному пользователю'], 200);
        }
        if($recipient->isFriendWith(Auth::user())) {
            return response()->json(['message' => 'Вы уже являетесь другом данному пользователю'], 200);
        }
        Auth::user()->befriend($recipient);
        return response()->json(['message' => 'Запрос на добавление в друзья отправлен'], 200);
    }

    /**
     * @param AddToFriend $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function acceptFriendshipRequest(AddToFriend $request) {
        $sender = User::find($request->userId);
        if(Auth::user()->hasFriendRequestFrom($sender)) {
            Auth::user()->acceptFriendRequest($sender);
            return response()->json(['message' => 'Вы приняли пользователя в друзья'], 200);
        }
        return response()->json(['message' => 'Данный пользователь не отправлял вам запрос в друзья'], 200);
    }

    /**
     * @param AddToFriend $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function declineFriendshipRequest(AddToFriend $request) {
        $sender = User::find($request->userId);
        if(Auth::user()->hasFriendRequestFrom($sender)) {
            Auth::user()->denyFriendRequest($sender);
            return response()->json(['message' => 'Вы отклонили запрос на добавление в друзья от пользователя'], 200);
        }
        return response()->json(['message' => 'Данный пользователь не отправлял вам запрос в друзья'], 200);
    }

    /**
     * @return UserCollection
     */
    public function getMyFriendsList() {
        $friend_ids = Auth::user()->getFriends()->pluck('id');
        $friends = User::with('profile', 'privacySettings')->whereIn('id', $friend_ids)->get();
        return new UserCollection($friends);
    }
}
