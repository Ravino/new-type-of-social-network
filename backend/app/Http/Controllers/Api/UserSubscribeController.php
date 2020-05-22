<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
     * @return JsonResponse
     */
    public function exists(Request $request)
    {
        return response()->json([
            'result' => $this->userService->isSubscribed(auth()->user()->id, $request->user->id),
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function subscribe(Request $request)
    {
        $subscribe = $this->userService->subscribe(auth()->user()->id, $request->user->id);
        if ($subscribe === null) {
            return response()->json([
                'message' => 'Вы уже подписаны на этого пользователя',
            ], 422);
        }

        if ($subscribe) {
            return response()->json([
                'message' => 'Вы подписались на этого пользователя',
            ]);
        }

        return response()->json([
            'message' => 'Ошибка подписки',
        ], 422);
    }
}
