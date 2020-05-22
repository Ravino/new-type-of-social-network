<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blacklist\BlacklistDelete;
use App\Http\Requests\Blacklist\BlacklistStore;
use App\Http\Resources\User\SimpleUsers;
use App\Models\User\Blacklisted;
use Illuminate\Http\Request;

class UserBlacklistController extends Controller
{
    public function index(Request $request)
    {
        $blacklistUsers = \Auth::user()
            ->blacklistUsers()
            ->with('profile')
            ->limit($request->query('limit') ?? 50)
            ->offset($request->query('offset') ?? 0)
            ->get();

        return new SimpleUsers($blacklistUsers);
    }

    /**
     * Add user to blacklist api method.
     * @param BlacklistStore $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(BlacklistStore $request)
    {
        $userId = \Auth::user()->id;
        $blacklisted_id = $request->userId;

        Blacklisted::create([
            'user_id' => $userId,
            'blacklisted_id' => $blacklisted_id,
        ]);

        return response()->json([
            'message' => 'Пользователь успешно добавлен в черный список.'
        ]);
    }

    /**
     * Delete user from blacklist api method.
     * @param BlacklistDelete $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(BlacklistDelete $request)
    {
        $user = \Auth::user();
        $blacklisted_id = $request->userId;
        $user->blacklistUsers()->where('blacklisted_id', $blacklisted_id)->first()->delete();

        return response()->json([
            'message' => 'Пользователь успешно удален из черного списка.',
        ]);
    }
}
