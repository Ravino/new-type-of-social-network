<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\AddToFriend;
use App\Http\Requests\User\MarkNotificationsAsRead;
use App\Http\Resources\Notification\NotificationCollection;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserSearchCollection;
use App\Models\User;
use DB;
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
        if (!empty($search) || strlen($search) > 3) {
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

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeFromFriends($id) {
        $friend = User::find($id);
        if (Auth::user()->isFriendWith($friend)) {
            Auth::user()->unfriend($friend);
            return response()->json(['message' => 'Вы удалили пользователя из друзей'], 200);
        }
        return response()->json(['message' => 'Вы не являетесь другом данному пользователю'], 422);
    }

    /**
     * @param AddToFriend $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function blockFriendshipRequest(AddToFriend $request) {
        $sender = User::find($request->userId);
        if(Auth::user()->hasFriendRequestFrom($sender)) {
            Auth::user()->blockFriend($sender);
            return response()->json(['message' => 'Вы Заблокировали пользователя'], 200);
        }
        return response()->json(['message' => 'Данный пользователь не отправлял вам запрос в друзья'], 200);
    }

    /**
     * @param Request $request
     * @return UserCollection
     */
    public function getMyFriendsList(Request $request) {
        clock()->startEvent('get-friends', "");
        $friend_ids = Auth::user()->getFriends($request->query('limit') ?? 50, $request->query('offset') ?? 0);
        clock()->endEvent('get-friends', "");
        $friends = User::with('profile', 'profile.avatar')
            ->whereIn('id', array_keys($friend_ids))
            ->get();
        $total_count = $friend_ids[array_key_first($friend_ids)]['total_count'];
        foreach ($friends as $friend) {
            $friend->mutual_count = $friend_ids[$friend->id]['mutual_count'];
        }
        return new UserCollection($friends, $total_count);
    }

    /**
     * @return UserCollection
     */
    public function getMyPendingFriendsList() {
        $request_user_ids = Auth::user()->getFriendRequests()->pluck('sender_id');
        $requests = User::with('profile', 'profile.avatar')->whereIn('id', $request_user_ids)->get();
        return new UserCollection($requests);
    }

    /**
     * @param Request $request
     * @param $id
     * @return UserCollection
     */
    public function getUserFriendsList(Request $request, $id) {
        $user = User::find($id);
        $friend_ids = $user->getFriends($request->query('limit') ?? 50, $request->query('offset') ?? 0);
        $friends = User::with( 'profile', 'profile.avatar')->whereIn('id', array_keys($friend_ids))->get();
        $total_count = $friend_ids[array_key_first($friend_ids)]['total_count'];
        foreach ($friends as $friend) {
            $friend->mutual_count = $friend_ids[$friend->id]['mutual_count'];
        }
        return new UserCollection($friends, $total_count);
    }

    /**
     * @param Request $request
     * @return UserCollection
     */
    public function getPossibleFriends(Request $request) {
        $fof_ids = Auth::user()->getFriendsOfFriends($request->query('limit') ?? 50, $request->query('offset') ?? 0);
        $fofs = User::with( 'profile', 'profile.avatar')->whereIn('id', array_keys($fof_ids))->get();
        $total_count = $fof_ids[array_key_first($fof_ids)]['total_count'];
        foreach ($fofs as $fof) {
            $fof->mutual_count = $fof_ids[$fof->id]['mutual_count'];
        }
        return new UserCollection($fofs, $total_count);
    }

    /**
     * @return UserCollection
     */
    public function getRecommendedFriends() {
        $users = Auth::user()->recommendedFriends;
        return new UserCollection($users);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addFriendToGroup(Request $request) {
        $user = User::find($request->userId);
        if (Auth::user()->isFriendWith($user)) {
            Auth::user()->groupFriend($user, $request->group);
            return response()->json(['message' => 'Вы добавили пользователя в группу'], 200);
        } else {
            return response()->json(['message' => 'Данный пользователь не в ваших друзьях'], 422);
        }
    }

    /**
     * @param $group
     * @param $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteFriendFromGroup($group, $userId) {
        $user = User::where('id', $userId)->first();
        if (!Auth::user()->isFriendWith($user)) {
            return response()->json(['message' => 'Данный пользователь не в ваших друзьях'], 422);
        }

        Auth::user()->ungroupFriend($user, $group);
        return response()->json(['message' => 'Вы удалили пользователя из группы'], 200);
    }

    /**
     * @param $group
     * @return UserCollection
     */
    public function getFriendsFromGroup($group) {
        $friend_ids = Auth::user()->getAllFriendships($group)->pluck('friend_id');
        $friends = User::whereIn('id', $friend_ids)->get();
        return new UserCollection($friends);
    }

    /**
     * @param Request $request
     * @return NotificationCollection
     */
    public function notifications(Request $request) {
        $notifications = Auth::user()->unreadNotifications()->limit($request->query('limit') ?? 10)->offset($request->query('offset') ?? 0)->get();
        return new NotificationCollection($notifications);
    }

    /**
     * @param MarkNotificationsAsRead $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function markNotificationsAsRead(MarkNotificationsAsRead $request)
    {
        $affected = Auth::user()->unreadNotifications()->whereIn('id', $request->get('ids'))->update(['read_at' => time()]);
        return response()->json([
            'data' => [
                'affected' => $affected
            ]
        ]);
    }
}
