<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\AddToFriend;
use App\Http\Resources\Notification\NotificationCollection;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserSearchCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * @param string $search
     * @return UserSearchCollection|\Illuminate\Http\JsonResponse
     */
    public function search(string $search)
    {
        if (!empty($search)) {
            $users = User::where(function($query) use ($search)  {
                $query->whereHas('profile', function($profile) use ($search) {
                    $profile
                        ->where('first_name', 'LIKE', "%{$search}%")
                        ->orWhere('last_name', 'LIKE', "%{$search}%")
                        ->orderBy('last_name');
                })
                ->orWhere('email', 'LIKE', "%{$search}%");
            })->where('id', '<>', Auth::user()->id)
                ->limit(10)
                ->get();
            return new UserSearchCollection($users);
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
            return response()->json(['message' => 'Вы уже отправляли запрос данному пользователю'], 422);
        }
        if($recipient->isFriendWith(Auth::user())) {
            return response()->json(['message' => 'Вы уже являетесь другом данному пользователю'], 422);
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
        return response()->json(['message' => 'Данный пользователь не отправлял вам запрос в друзья'], 422);
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

    public function blockFriendshipRequest(AddToFriend $request) {
        $sender = User::find($request->userId);
        if(Auth::user()->hasFriendRequestFrom($sender)) {
            Auth::user()->blockFriend($sender);
            return response()->json(['message' => 'Вы Заблокировали пользователя'], 200);
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

    /**
     * @return UserCollection
     */
    public function getMyPendingFriendsList() {
        $request_user_ids = Auth::user()->getFriendRequests()->pluck('sender_id');
        $requests = User::whereIn('id', $request_user_ids)->get();
        return new UserCollection($requests);
    }

    /**
     * @param $id
     * @return UserCollection|\Illuminate\Http\JsonResponse
     */
    public function getUserFriendsList($id) {
        $user = User::find($id);
        $friend_ids = $user->getFriends()->pluck('id');
        $friends = User::with('profile', 'privacySettings')->whereIn('id', $friend_ids)->get();
        return new UserCollection($friends);
    }

    /**
     * @return NotificationCollection
     */
    public function notifications() {
        return new NotificationCollection(Auth::user()->notifications()->get());
    }
}
