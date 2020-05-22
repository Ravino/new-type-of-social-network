<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserCollection;
use App\Models\User;
use Domain\Neo4j\Service\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class UserSubscribeController extends Controller
{
    /**
     * @var UserService
     */
    private $userService;

    /**
     * UserSubscribeController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param Request $request
     * @return UserCollection|array
     */
    public function list(Request $request)
    {
        if (!$user_ids = $this->userService->followList(
            auth()->user()->id,
            $request->query('limit', 20),
            $request->query('offset', 0)
        )) {
            return new UserCollection([], 0);
        }

        $users = User::with('profile', 'profile.avatar')
            ->whereIn('id', array_keys($user_ids))
            ->get();

        $total_count = array_key_first($user_ids) ? $user_ids[array_key_first($user_ids)]['total_count'] : 0;

        return new UserCollection($users, $total_count);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function exists(Request $request)
    {
        return response()->json([
            'result' => $this->userService->isFollowed(auth()->user()->id, $request->user->id),
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function follow(Request $request)
    {
        $success = $this->userService->follow(auth()->user()->id, $request->user->id);
        if ($success === null) {
            return response()->json([
                'message' => 'Вы уже подписаны на этого пользователя',
            ], 422);
        }

        if ($success) {
            return response()->json([
                'message' => 'Вы подписались на этого пользователя',
            ]);
        }

        return response()->json([
            'message' => 'Ошибка подписки',
        ], 422);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function unfollow(Request $request)
    {
        $success = $this->userService->unfollow(auth()->user()->id, $request->user->id);
        if ($success === null) {
            return response()->json([
                'message' => 'Вы не подписаны на этого пользователя',
            ], 422);
        }

        if ($success) {
            return response()->json([
                'message' => 'Вы отписались от этого пользователя',
            ]);
        }

        return response()->json([
            'message' => 'Ошибка отписки',
        ], 422);
    }
}
